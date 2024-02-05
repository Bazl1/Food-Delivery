namespace FoodDelivery.Orders.GraphQL.Schemas;

public class OrderItemInput
{
    public string Id { get; set; } = null!;
    public int Count { get; set; }
}