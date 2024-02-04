namespace FoodDelivery.Orders.GraphQL.Schemas;

public class OrderItemInput
{
    public string ProductId { get; set; } = null!;
    public int Count { get; set; }
}