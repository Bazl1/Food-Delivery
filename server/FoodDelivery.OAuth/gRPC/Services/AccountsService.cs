using FoodDelivery.OAuth.Data.Stores;
using FoodDelivery.OAuth.Domain.Entities;
using Grpc.Core;

namespace FoodDelivery.OAuth.gRPC.Services;

#pragma warning disable CS1998, CS8604, CS8602, CS0168

public class AccountsService(
    FakeStore _store
) : Accounts.AccountsBase
{
    #region GetRestaurantInfo
    public override async Task<RestaurantInfoResponse> GetRestaurantInfo(
        RestaurantInfoRequest request,
        ServerCallContext context)
    {
        if (_store.Accounts.SingleOrDefault(account => account.Id == request.Id) is not Account account)
        {
            throw new RpcException(
                new Status(StatusCode.NotFound, $"Account with given id {request.Id} is not found.")
            );
        }
        var restaurant = _store.Restaurants.SingleOrDefault(account => account.Id == request.Id);

        return RestaurantInfoResponseFrom(account, restaurant);
    }

    private RestaurantInfoResponse RestaurantInfoResponseFrom(
        Account account,
        Restaurant restaurant)
        => new RestaurantInfoResponse
        {
            Id = account.Id,
            Email = account.Email,
            Name = restaurant.Name,
            Description = restaurant.Description,
            BannerUrl = restaurant.BannerUrl,
        };
    #endregion GetRestaurantInfo

    #region GetCustomerInfo

    public override async Task<CustomerInfoResponse> GetCustomerInfo(
        CustomerInfoRequest request,
        ServerCallContext context)
    {
        if (_store.Accounts.SingleOrDefault(account => account.Id == request.Id) is not Account account)
        {
            throw new RpcException(
                new Status(StatusCode.NotFound, $"Account with given id {request.Id} is not found.")
            );
        }
        var customer = _store.Customers.SingleOrDefault(account => account.Id == request.Id);

        return CustomerInfoResponseFrom(account, customer);
    }

    private CustomerInfoResponse CustomerInfoResponseFrom(
        Account account,
        Customer customer)
        => new CustomerInfoResponse
        {
            Id = account.Id,
            Email = account.Email,
            UserName = customer.UserName
        };
    #endregion GetCustomerInfo
}