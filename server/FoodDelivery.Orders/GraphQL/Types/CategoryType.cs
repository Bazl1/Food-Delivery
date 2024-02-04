namespace FoodDelivery.Orders.GraphQL.Types;

public class CategoryType
{
    public int? Id { get; set; } = null;
    public string? Title { get; set; } = null;

    public static CategoryType From(Products.gRPC.Category category)
        => new CategoryType
        {
            Id = category.Id,
            Title = category.Title
        };
}