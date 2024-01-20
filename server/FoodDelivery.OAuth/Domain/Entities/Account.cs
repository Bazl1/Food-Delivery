using FoodDelivery.OAuth.Domain.Enums;

namespace FoodDelivery.OAuth.Domain.Entities;

public class Account
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;
    public string? RefreshToken { get; set; } = null;
    public AccountRole Role { get; set; }

    public static Account Create(string email, string password, AccountRole role)
        => new Account { Email = email, Password = password, Role = role };

    public static Account CreateCustomer(string email, string password)
        => Create(email, password, AccountRole.Customer);

    public static Account CreateRestaurant(string email, string password)
        => Create(email, password, AccountRole.Restaurant);
}