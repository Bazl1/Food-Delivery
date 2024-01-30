using FoodDelivery.Domain.Entities;

namespace FoodDelivery.GraphQL.Types;

public class ProductType
{
    public string Id { get; set; } = null!;
    public RestaurantType? Restaurant { get; set; }
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string Picture { get; set; } = null!;
    public decimal Price { get; set; }
    public List<CategoryType> Categories { get; set; } = new();

    public static ProductType From(Product product)
        => new ProductType
        {
            Id = product.Id,
            Restaurant = null,
            Title = product.Title,
            Description = product.Description,
            Picture = product.Picture,
            Price = product.Price,
            Categories = CategoryType.From(product.Categories).ToList()
        };
}