namespace FoodDelivery.Domain.Entities;

public class Category
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public List<Product> Products { get; set; } = new();

    public static Category Create(int id, string title)
        => new Category { Id = id, Title = title };
}