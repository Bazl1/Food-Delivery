namespace FoodDelivery.Orders.GraphQL.Types;

public class OrderItemType
{
    public ProductType? Product { get; set; } = null;
    public int? Count { get; set; } = null;

    public static OrderItemType From(Products.gRPC.Product product, int count)
        => new OrderItemType
        {
            Product = product == null ? null : ProductType.From(product),
            Count = count
        };
}