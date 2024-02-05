using System.Security.Claims;
using FoodDelivery.OAuth.gRPC;
using FoodDelivery.Orders.Domain.Entites;
using FoodDelivery.Orders.GraphQL.Types;
using FoodDelivery.Orders.Stores;
using HotChocolate.Authorization;
using HotChocolate.Resolvers;
using FoodDelivery.Orders.gRPC.Utils;
using FoodDelivery.Orders.GraphQL.Schemas;

namespace FoodDelivery.Orders.GraphQL;

#pragma warning disable CS1998, CS8604, CS8602, CS0168

public class Mutations
{
    [Authorize(Roles = ["Customer"])]
    public async Task<OrderType?> CreateOrder(
        IResolverContext context,
        ClaimsPrincipal claimsPrincipal,
        [Service] FakeStore store,
        [Service] Accounts.AccountsClient accountsClient,
        [Service] Products.gRPC.Products.ProductsClient productsClient,
        List<OrderItemInput> items
    )
    {
        try
        {
            var accountId = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);

            var customer = await accountsClient.GetCustomerInfoAsync(new CustomerInfoRequest { Id = accountId });
            var products = await productsClient.GetProdcutsByIdsAsync(items.Select(item => item.Id).ToList());

            var order = Order.Create(accountId);
            order.Items.AddRange(items.Select(item => OrderItem.Create(order.Id, item.Id, item.Count)));
            store.Add(order);

            return OrderType.From(order, customer, products);
        }
        catch (Exception ex)
        {
            context.ReportError(
                ErrorBuilder.New()
                    .SetMessage(ex.Message)
                    .Build()
            );
            return null;
        }
    }
}