using FoodDelivery.Orders.Domain.Entites;

namespace FoodDelivery.Orders.Stores;

public class FakeStore
{
    public List<Order> Orders { get; set; } = new();
    public List<OrderItem> OrderItems { get; set; } = new();

    public void Add(Order entity)
    {
        Orders.Add(entity);
        if (entity.Items.Count != 0)
        {
            OrderItems.AddRange(entity.Items);
        }
    }
}