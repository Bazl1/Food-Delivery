using FoodDelivery.OAuth.Data.Stores;
using FoodDelivery.OAuth.Domain.Entities;
using FoodDelivery.OAuth.GraphQL.Schemas;
using FoodDelivery.OAuth.Services;
using HotChocolate.Resolvers;

namespace FoodDelivery.OAuth.GraphQL.Mutations;

public class AuthMutation
{
    public async Task<AuthType?> SignUpAsRestaurant(
        IResolverContext context,
        [Service] IHttpContextAccessor httpContextAccessor,
        [Service] FakeStore store,
        [Service] JwtTokenGenerator jwtTokenGenerator,
        string email,
        string password,
        string name,
        string description)
    {
        if (store.Accounts.Any(account => account.Email == email))
        {
            context.ReportError(
                ErrorBuilder.New()
                    .SetMessage($"Account with given {email} email is already exists.")
                    .Build()
            );
            return null;
        }

        var account = Account.CreateRestaurant(email, password);

        var accessToken = jwtTokenGenerator.GenerateToken(account);
        var refreshToken = jwtTokenGenerator.GenerateToken(account);

        account.RefreshToken = refreshToken;
        store.Accounts.Add(account);

        //
        var restaurant = Restaurant.Create(account.Id, name, description);
        store.Restaurants.Add(restaurant);
        //

        httpContextAccessor.HttpContext?.Response.Cookies.Append("refresh_token", refreshToken);

        return AuthType.Create(accessToken, refreshToken, AccountType.Create(account));
    }

    public async Task<AuthType?> SignUpAsCustomer(
        IResolverContext context,
        [Service] IHttpContextAccessor httpContextAccessor,
        [Service] FakeStore store,
        [Service] JwtTokenGenerator jwtTokenGenerator,
        string email,
        string password,
        string userName)
    {
        if (store.Accounts.Any(account => account.Email == email))
        {
            context.ReportError(
                ErrorBuilder.New()
                    .SetMessage($"Account with given {email} email is already exists.")
                    .Build()
            );
            return null;
        }

        var account = Account.CreateCustomer(email, password);

        var accessToken = jwtTokenGenerator.GenerateToken(account);
        var refreshToken = jwtTokenGenerator.GenerateToken(account);

        account.RefreshToken = refreshToken;
        store.Accounts.Add(account);

        //
        var customer = Customer.Create(account.Id, userName);
        store.Customers.Add(customer);
        //

        httpContextAccessor.HttpContext?.Response.Cookies.Append("refresh_token", refreshToken);

        return AuthType.Create(accessToken, refreshToken, AccountType.Create(account));
    }

    public async Task<AuthType?> SignIn(
        IResolverContext context,
        [Service] IHttpContextAccessor httpContextAccessor,
        [Service] FakeStore store,
        [Service] JwtTokenGenerator jwtTokenGenerator,
        string email,
        string password)
    {
        if (store.Accounts.SingleOrDefault(account => account.Email == email) is not Account account)
        {
            context.ReportError(
                ErrorBuilder.New()
                    .SetMessage($"Account with given {email} email is already exists.")
                    .Build()
            );
            return null;
        }

        if (password == account.Password)
        {
            context.ReportError(
                ErrorBuilder.New()
                    .SetMessage($"Password mismatch.")
                    .Build()
            );
            return null;
        }

        var accessToken = jwtTokenGenerator.GenerateToken(account);
        var refreshToken = jwtTokenGenerator.GenerateToken(account);
        httpContextAccessor.HttpContext?.Response.Cookies.Append("refresh_token", refreshToken);

        return AuthType.Create(accessToken, refreshToken, AccountType.Create(account));
    }

    public async Task SignOut(
        IResolverContext context,
        [Service] IHttpContextAccessor httpContextAccessor,
        [Service] FakeStore store)
    {
        var oldRefreshToken = httpContextAccessor.HttpContext?.Request.Cookies["refresh_token"] ?? string.Empty;
        if (store.Accounts.SingleOrDefault(account => account.RefreshToken == oldRefreshToken) is not Account account)
        {
            context.ReportError(
                ErrorBuilder.New()
                    .SetMessage("Invalid refresh token.")
                    .Build()
            );
            return;
        }

        account.RefreshToken = null;
        httpContextAccessor.HttpContext?.Response.Cookies.Delete("refresh_token");

        return;
    }

    public async Task<AuthType?> RefreshToken(
        IResolverContext context,
        [Service] IHttpContextAccessor httpContextAccessor,
        [Service] FakeStore store,
        [Service] JwtTokenGenerator jwtTokenGenerator)
    {
        var oldRefreshToken = httpContextAccessor.HttpContext?.Request.Cookies["refresh_token"] ?? string.Empty;
        if (store.Accounts.SingleOrDefault(account => account.RefreshToken == oldRefreshToken) is not Account account)
        {
            context.ReportError(
                ErrorBuilder.New()
                    .SetMessage("Invalid refresh token.")
                    .Build()
            );
            return null;
        }

        var accessToken = jwtTokenGenerator.GenerateToken(account);
        var refreshToken = jwtTokenGenerator.GenerateToken(account);

        account.RefreshToken = refreshToken;
        httpContextAccessor.HttpContext?.Response.Cookies.Append("refresh_token", refreshToken);

        return AuthType.Create(accessToken, refreshToken, AccountType.Create(account));
    }
}