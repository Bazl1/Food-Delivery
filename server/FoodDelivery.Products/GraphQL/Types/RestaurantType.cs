namespace FoodDelivery.GraphQL.Types;

public class RestaurantType
{
    public string Id { get; set; } = null!;
    public string Name { get; set; } = null!;

    public static RestaurantType From(GrpcService.RestaurantInfoResponse restaurantInfo)
        => new RestaurantType
        {
            Id = restaurantInfo.Id,
            Name = restaurantInfo.Name,
        };
}