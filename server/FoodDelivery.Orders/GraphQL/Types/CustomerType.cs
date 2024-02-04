namespace FoodDelivery.Orders.GraphQL.Schemas;

public class CustomerType
{
    public string? Id { get; set; } = null;
    public string? Email { get; set; } = null;
    public string? UserName { get; set; } = null;

    public static CustomerType From(OAuth.gRPC.CustomerInfoResponse customer)
        => new CustomerType
        {
            Id = customer.Id,
            Email = customer.Email,
            UserName = customer.UserName
        };
}