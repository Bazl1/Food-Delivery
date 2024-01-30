using FoodDelivery.Domain.Entities;

namespace FoodDelivery.Products.Stores;

public class Store
{
    public List<Product> Products { get; set; } = new();
    public List<Category> Categories { get; set; } = new()
    {
        Category.Create(1, "Pizza"),
        Category.Create(2, "Sushi"),
        Category.Create(3, "Breakfast"),
        Category.Create(4, "Burgers"),
        Category.Create(5, "Desserts"),
        Category.Create(6, "Fast food"),
        Category.Create(7, "Grill"),
        Category.Create(8, "Meat"),
        Category.Create(9, "Tea & coffee"),
        Category.Create(10, "Seafood"),
        Category.Create(11, "Shawarma"),
    };
}