namespace FoodDelivery.Orders.Domain.Entites;

public class OrderItem
{
    public string OrderId { get; set; } = null!;
    public string ProductId { get; set; } = null!;
    public int Count { get; set; }

    public static OrderItem Create(string orderId, string productId, int count)
        => new OrderItem { OrderId = orderId, ProductId = productId, Count = count };
}