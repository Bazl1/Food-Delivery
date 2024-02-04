using FoodDelivery.OAuth.Domain.Entities;

namespace FoodDelivery.OAuth.GraphQL.Schemas;

public class CustomerType
{
    public string? Id { get; set; } = null;
    public string? Email { get; set; } = null;
    public string? Password { get; set; } = null;
    public string? UserName { get; set; } = null;

    public static CustomerType Create(Account account, Customer customer)
        => new CustomerType { Id = account.Id, Email = account.Email, Password = account.Password, UserName = customer.UserName };
}