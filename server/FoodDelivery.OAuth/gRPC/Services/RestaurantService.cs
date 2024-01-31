using FoodDelivery.OAuth.Data.Stores;
using FoodDelivery.OAuth.Domain.Entities;
using Grpc.Core;

namespace FoodDelivery.OAuth.gRPC.Services;

public class RestaurantService(
    FakeStore _store
) : GrpcService.Restaurant.RestaurantBase
{
    #region GetRestaurantInfo
    public override async Task<GrpcService.RestaurantInfoResponse> GetRestaurantInfo(
        GrpcService.RestaurantInfoRequest request,
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

    private GrpcService.RestaurantInfoResponse RestaurantInfoResponseFrom(Account account, Restaurant restaurant)
        => new GrpcService.RestaurantInfoResponse
        {
            Id = account.Id,
            Email = account.Email,
            Name = restaurant.Name,
            Description = restaurant.Description,
            BannerUrl = restaurant.BannerUrl,
        };
    #endregion GetRestaurantInfo
}