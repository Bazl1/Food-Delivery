using FoodDelivery.Domain.Entities;
using FoodDelivery.GraphQL.Types;
using FoodDelivery.Products.Stores;
using HotChocolate;
using HotChocolate.Resolvers;

namespace FoodDelivery.GraphQL;

public class Queries
{
    public async Task<ProductType?> GetProductById(
        IResolverContext context,
        [Service] Store store,
        string id)
    {
        if (store.Products.SingleOrDefault(product => product.Id == id) is not Product product)
        {
            context.ReportError(
                ErrorBuilder.New()
                    .SetMessage("Product with given id is not found.")
                    .Build()
            );
            return null;
        }

        return ProductType.From(product);
    }
}