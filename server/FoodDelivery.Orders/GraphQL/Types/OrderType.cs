using FoodDelivery.Orders.Domain.Entites;
using FoodDelivery.Orders.GraphQL.Schemas;

namespace FoodDelivery.Orders.GraphQL.Types;

public class OrderType
{
    public string? Id { get; set; } = null;
    public CustomerType? Customer { get; set; } = null;
    public List<ProductType>? Items { get; set; } = null;
    public string? Status { get; set; } = null;
    public decimal? TotalPrice { get; set; } = null;

    public static OrderType From(
        Order order,
        OAuth.gRPC.CustomerInfoResponse customer,
        List<Products.gRPC.Product> products)
    {
        var orderType = new OrderType
        {
            Id = order.Id,
            Customer = customer == null ? null : CustomerType.From(customer),
            Items = products
                .Join(
                    order.Items,
                    product => product.Id,
                    item => item.ProductId,
                    (product, item) => new { Product = product, Count = item.Count }
                )
                .Select(item => ProductType.From(item.Product, item.Count))
                .ToList(),
            Status = order.Status.ToString(),
            TotalPrice = 0.00m
        };
        foreach (var item in orderType.Items)
        {
            orderType.TotalPrice += (item.Price * item.Count);
        }
        return orderType;
    }
}