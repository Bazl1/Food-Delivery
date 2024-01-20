namespace FoodDelivery.OAuth.Domain.Entities;

public class Customer
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string UserName { get; set; } = null!;
    public string Location { get; set; } = null!;

    public static Customer Create(string id, string userName, string location)
        => new Customer { Id = id, UserName = userName, Location = location };
}