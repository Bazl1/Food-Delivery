using FoodDelivery.Domain.Entities;

namespace FoodDelivery.GraphQL.Types;

public class CategoryType
{
    public int? Id { get; set; }
    public string? Title { get; set; } = null!;

    public static CategoryType From(Category category)
        => new CategoryType
        {
            Id = category.Id,
            Title = category.Title,
        };

    public static IEnumerable<CategoryType> From(IEnumerable<Category> categories)
        => categories.Select(category => CategoryType.From(category));
}