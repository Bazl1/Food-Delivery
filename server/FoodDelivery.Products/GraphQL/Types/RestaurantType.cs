using FoodDelivery.OAuth.gRPC;

namespace FoodDelivery.Orders.GraphQL.Types;

public class RestaurantType
{
    public string? Id { get; set; } = null!;
    public string? Name { get; set; } = null!;

    public static RestaurantType From(RestaurantInfoResponse restaurantInfo)
        => new RestaurantType
        {
            Id = restaurantInfo.Id,
            Name = restaurantInfo.Name,
        };
}