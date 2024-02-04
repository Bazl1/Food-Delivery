namespace FoodDelivery.Orders.GraphQL.Types;

public class ProductType
{
    public string? Id { get; set; } = null;
    public RestaurantType? Restaurant { get; set; } = null;
    public string? Title { get; set; } = null;
    public string? Description { get; set; } = null;
    public string? Picture { get; set; } = null;
    public decimal? Price { get; set; } = null;
    public List<CategoryType>? Categories { get; set; } = null;

    public static ProductType? From(Products.gRPC.Product product)
        => new ProductType
        {
            Id = product.Id,
            Title = product.Title,
            Restaurant = product.Restaurant == null ? null : RestaurantType.From(product.Restaurant),
            Description = product.Description,
            Picture = product.Picture,
            Price = (decimal)product.Price,
            Categories = product.Categories
                .Select(category => CategoryType.From(category))
                .ToList()
        };
}