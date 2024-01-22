using System.Security.Claims;
using FoodDelivery.OAuth.Data.Stores;
using FoodDelivery.OAuth.GraphQL.Schemas;
using FoodDelivery.OAuth.Services;
using HotChocolate.Authorization;
using HotChocolate.Resolvers;
using Microsoft.IdentityModel.Tokens;

namespace FoodDelivery.OAuth.GraphQL.Queries;

public class AuthQuery
{
    public async Task<bool> Verify(
        IResolverContext context,
        [Service] JwtTokenGenerator jwtTokenGenerator,
        [Service] IHttpContextAccessor httpContextAccessor)
    {
        try
        {
            var token = httpContextAccessor.HttpContext?.Request.Headers["Authorization"].ToString().Split(" ")[1] ?? string.Empty;
            jwtTokenGenerator.VerifyToken(token);
            return true;
        }
        catch (SecurityTokenValidationException ex)
        {
            context.ReportError(
                ErrorBuilder.New()
                    .SetMessage("Invalid token.")
                    .Build()
            );
            return false;
        }
    }

    [Authorize]
    public async Task<AccountType?> GetAccountInfo(
        IResolverContext context,
        ClaimsPrincipal claimsPrincipal,
        [Service] FakeStore store)
    {
        var accountId = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        var account = store.Accounts.SingleOrDefault(account => account.Id == accountId);
        return AccountType.Create(account);
    }

    [Authorize(Roles = ["Customer"])]
    public async Task<CustomerType?> GetCustomerInfo(
        IResolverContext context,
        ClaimsPrincipal claimsPrincipal,
        [Service] FakeStore store)
    {
        var accountId = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        var account = store.Accounts.SingleOrDefault(account => account.Id == accountId);
        var customer = store.Customers.SingleOrDefault(customer => customer.Id == account.Id);
        return CustomerType.Create(account, customer);
    }

    [Authorize(Roles = ["Restaurant"])]
    public async Task<RestaurantType?> GetRestaurantInfo(
        IResolverContext context,
        ClaimsPrincipal claimsPrincipal,
        [Service] FakeStore store)
    {
        var accountId = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        var account = store.Accounts.SingleOrDefault(account => account.Id == accountId);
        var restaurant = store.Restaurants.SingleOrDefault(restaurant => restaurant.Id == account?.Id);
        return RestaurantType.Create(account, restaurant);
    }
}