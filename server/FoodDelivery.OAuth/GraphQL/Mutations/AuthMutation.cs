using System;
using FoodDelivery.OAuth.Data.Stores;
using FoodDelivery.OAuth.Domain.Entities;
using FoodDelivery.OAuth.GraphQL.Schemas;
using FoodDelivery.OAuth.Services;
using HotChocolate.Resolvers;

namespace FoodDelivery.OAuth.GraphQL.Mutations;

public class AuthMutation
{
    public async Task<SignUpAsRestaurantType?> SignUpAsRestaurant(
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
                    .SetMessage("Account with given email is already exists.")
                    .Build()
            );
            return null;
        }

        var account = Account.CreateRestaurant(input.Email, input.Password);
        var accessToken = jwtTokenGenerator.GenerateToken(account);
        var refreshToken = jwtTokenGenerator.GenerateToken(account);
        account.RefreshToken = refreshToken;
        store.Accounts.Add(account);

        var restaurant = Restaurant.Create(account.Id, input.Name, input.Description);
        var restaurantType = RestaurantType.Create(account, restaurant);
        store.Restaurants.Add(restaurant);
        httpContextAccessor.HttpContext?.Response.Cookies.Append("refresh_token", refreshToken);

        return SignUpAsRestaurantType.Create(accessToken, refreshToken, restaurantType);
    }

    public async Task<SignUpAsCustomerType?> SignUpAsCustomer(
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
                    .SetMessage("Account with given email is already exists.")
                    .Build()
            );
            return null;
        }

        var account = Account.CreateCustomer(input.Email, input.Password);
        var accessToken = jwtTokenGenerator.GenerateToken(account);
        var refreshToken = jwtTokenGenerator.GenerateToken(account);
        account.RefreshToken = refreshToken;
        store.Accounts.Add(account);

        var customer = Customer.Create(account.Id, input.UserName, input.Location);
        var customerType = CustomerType.Create(account, customer);
        store.Customers.Add(customer);
        httpContextAccessor.HttpContext?.Response.Cookies.Append("refresh_token", refreshToken);

        return SignUpAsCustomerType.Create(accessToken, refreshToken, customerType);
    }

    public async Task SignIn(SignInInput input)
    {

    }

    public async Task SignOut()
    {

    }

    public async Task<RefreshTokenType?> RefreshToken(
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

        return RefreshTokenType.Create(accessToken, refreshToken);
    }
}