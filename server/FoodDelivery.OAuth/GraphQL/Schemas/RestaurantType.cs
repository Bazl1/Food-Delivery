using FoodDelivery.OAuth.Domain.Entities;

namespace FoodDelivery.OAuth.GraphQL.Schemas;

public class RestaurantType
{
    public string? Id { get; set; } = null;
    public string? Email { get; set; } = null;
    public string? Password { get; set; } = null;
    public string? Name { get; set; } = null;
    public string? Description { get; set; } = null;
    public string? BannerUrl { get; set; } = null;

    public static RestaurantType From(Account account, Restaurant restaurant)
        => new RestaurantType { Id = account.Id, Email = account.Email, Password = account.Password, Name = restaurant.Name, Description = restaurant.Description, BannerUrl = restaurant.BannerUrl };
}