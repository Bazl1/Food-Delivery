namespace FoodDelivery.Orders.GraphQL.Types;

public class RestaurantType
{
    public string? Id { get; set; } = null;
    public string? Name { get; set; } = null;

    public static RestaurantType From(Products.gRPC.Restaurant restaurant)
        => new RestaurantType
        {
            Id = restaurant.Id,
            Name = restaurant.Name
        };
}