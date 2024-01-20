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
        SignUpAsRestaurantInput input)
    {
        if (store.Accounts.Any(account => account.Email == input.Email))
        {
            context.ReportError(
                ErrorBuilder.New()
                    .SetMessage($"Account with given {input.Email} email is already exists.")
                    .Build()
            );
            return null;
        }

        var account = Account.CreateRestaurant(input.Email, input.Password);

        var accessToken = jwtTokenGenerator.GenerateToken(account);
        var refreshToken = jwtTokenGenerator.GenerateToken(account);

        account.RefreshToken = refreshToken;
        store.Accounts.Add(account);

        //
        var restaurant = Restaurant.Create(account.Id, input.Name, input.Description);
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
        SignUpAsCustomerInput input)
    {
        if (store.Accounts.Any(account => account.Email == input.Email))
        {
            context.ReportError(
                ErrorBuilder.New()
                    .SetMessage($"Account with given {input.Email} email is already exists.")
                    .Build()
            );
            return null;
        }

        var account = Account.CreateCustomer(input.Email, input.Password);

        var accessToken = jwtTokenGenerator.GenerateToken(account);
        var refreshToken = jwtTokenGenerator.GenerateToken(account);

        account.RefreshToken = refreshToken;
        store.Accounts.Add(account);

        //
        var customer = Customer.Create(account.Id, input.UserName);
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
        SignInInput input)
    {
        if (store.Accounts.SingleOrDefault(account => account.Email == input.Email) is not Account account)
        {
            context.ReportError(
                ErrorBuilder.New()
                    .SetMessage($"Account with given {input.Email} email is already exists.")
                    .Build()
            );
            return null;
        }

        if (input.Password == account.Password)
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
        [Service] FakeStore store
    )
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