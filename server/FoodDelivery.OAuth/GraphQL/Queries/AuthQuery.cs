using System.Security.Claims;
using FoodDelivery.OAuth.Data.Stores;
using FoodDelivery.OAuth.Domain.Entities;
using FoodDelivery.OAuth.GraphQL.Schemas;
using FoodDelivery.OAuth.Services;
using HotChocolate.Authorization;
using HotChocolate.Resolvers;
using Microsoft.IdentityModel.Tokens;

namespace FoodDelivery.OAuth.GraphQL.Queries;

#pragma warning disable CS1998, CS8604, CS8602, CS0168

public class AuthQuery
{
    public async Task<VerifyType> Verify(
        IResolverContext context,
        [Service] JwtTokenGenerator jwtTokenGenerator,
        [Service] IHttpContextAccessor httpContextAccessor)
    {
        try
        {
            var token = httpContextAccessor.HttpContext?.Request.Headers["Authorization"].ToString().Split(" ")[1] ?? string.Empty;
            var securityToken = jwtTokenGenerator.VerifyToken(token);
            string? role = securityToken.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.Role)?.Value;
            if (role == null)
            {
                return VerifyType.Create(null, false);
            }
            return VerifyType.Create(role, true);
        }
        catch
        {
            return VerifyType.Create(null, false);
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
        return RestaurantType.From(account, restaurant);
    }

    public async Task<List<RestaurantType>> GetRestaurants(
        IResolverContext context,
        [Service] FakeStore store)
    {
        var restaurants = new List<RestaurantType>();
        foreach (var restaurant in store.Restaurants)
        {
            var account = store.Accounts.SingleOrDefault(account => account.Id == restaurant.Id);
            restaurants.Add(RestaurantType.From(account, restaurant));
        }
        return restaurants;
    }

    public async Task<RestaurantType?> GetRestaurantById(
        IResolverContext context,
        [Service] FakeStore store,
        string id)
    {
        try
        {
            if (store.Accounts.SingleOrDefault(account => account.Id == id) is not Account account)
            {
                throw new Exception("The restaurant is not found.");
            }
            var restaurant = store.Restaurants.SingleOrDefault(restaurant => restaurant.Id == id);
            return RestaurantType.From(account, restaurant);
        }
        catch (Exception ex)
        {
            context.ReportError(
                ErrorBuilder.New()
                    .SetMessage(ex.Message)
                    .Build()
            );
            return null;
        }
    }
}