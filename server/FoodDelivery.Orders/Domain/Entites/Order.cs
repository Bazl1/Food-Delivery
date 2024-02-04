using FoodDelivery.Orders.Domain.Enums;

namespace FoodDelivery.Orders.Domain.Entites;

public class Order
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string AccountId { get; set; } = null!;
    public List<OrderItem> Items { get; set; } = new();
    public OrderStatus Status { get; set; } = OrderStatus.Created;

    public static Order Create(string accountId)
        => new Order { AccountId = accountId };
}