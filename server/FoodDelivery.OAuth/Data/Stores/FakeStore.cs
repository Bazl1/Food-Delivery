using FoodDelivery.OAuth.Domain.Entities;

namespace FoodDelivery.OAuth.Data.Stores;

public class FakeStore
{
    public List<Account> Accounts { get; set; } = new();
    public List<Customer> Customers { get; set; } = new();
    public List<Restaurant> Restaurants { get; set; } = new();
}