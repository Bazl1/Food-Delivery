using FoodDelivery.OAuth.Domain.Entities;

namespace FoodDelivery.OAuth.GraphQL.Schemas;

public class AccountType
{
    public string Id { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;
    public string Role { get; set; } = null!;

    public static AccountType Create(Account account)
        => new AccountType { Id = account.Id, Email = account.Email, Password = account.Password, Role = account.Role.ToString() };
}