namespace FoodDelivery.Domain.Entities;

public class Product
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string RestaurantId { get; set; } = null!;
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string Picture { get; set; } = null!;
    public decimal Price { get; set; }
    public List<Category> Categories { get; set; } = new();

    public static Product Create(
        string restaurantId,
        string title,
        string description,
        string picture,
        decimal price)
        => new Product
        {
            RestaurantId = restaurantId,
            Title = title,
            Description = description,
            Picture = picture,
            Price = price
        };
}