using System.Security.Claims;
using FoodDelivery.OAuth.Data.Stores;
using FoodDelivery.OAuth.Domain.Entities;
using FoodDelivery.OAuth.GraphQL.Schemas;
using FoodDelivery.OAuth.Services;
using HotChocolate.Resolvers;

namespace FoodDelivery.OAuth.GraphQL.Queries;

public class AuthQuery
{
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

    public async Task<AccountType?> GetAccountInfo(
        IResolverContext context,
        ClaimsPrincipal claimsPrincipal,
        [Service] FakeStore store)
    {
        var accountId = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        if (store.Accounts.SingleOrDefault(account => account.Id == accountId) is not Account account)
        {
            context.ReportError(
                ErrorBuilder.New()
                    .SetMessage("Invalid access token.")
                    .Build()
            );
            return null;
        }

        return AccountType.Create(account);
    }

    public async Task<CustomerType?> GetCustomerInfo(
        IResolverContext context,
        ClaimsPrincipal claimsPrincipal,
        [Service] FakeStore store)
    {
        var accountId = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        if (store.Accounts.SingleOrDefault(account => account.Id == accountId) is not Account account)
        {
            context.ReportError(
                ErrorBuilder.New()
                    .SetMessage("Invalid access token.")
                    .Build()
            );
            return null;
        }
        if (store.Customers.SingleOrDefault(customer => customer.Id == account.Id) is not Customer customer)
        {
            context.ReportError(
                ErrorBuilder.New()
                    .SetMessage("This account is not a customer.")
                    .Build()
            );
            return null;
        }

        return CustomerType.Create(account, customer);
    }

    public async Task<RestaurantType?> GetRestaurantInfo(
        IResolverContext context,
        ClaimsPrincipal claimsPrincipal,
        [Service] FakeStore store)
    {
        var accountId = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        if (store.Accounts.SingleOrDefault(account => account.Id == accountId) is not Account account)
        {
            context.ReportError(
                ErrorBuilder.New()
                    .SetMessage("Invalid access token.")
                    .Build()
            );
            return null;
        }
        if (store.Restaurants.SingleOrDefault(restaurant => restaurant.Id == account.Id) is not Restaurant restaurant)
        {
            context.ReportError(
                ErrorBuilder.New()
                    .SetMessage("This account is not a restaurant.")
                    .Build()
            );
            return null;
        }

        return RestaurantType.Create(account, restaurant);
    }
}