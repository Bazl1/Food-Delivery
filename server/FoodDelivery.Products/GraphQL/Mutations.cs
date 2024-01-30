using System.Security.Claims;
using FoodDelivery.Domain.Entities;
using FoodDelivery.GraphQL.Types;
using FoodDelivery.Products.Stores;
using HotChocolate;
using HotChocolate.Authorization;
using HotChocolate.Resolvers;

namespace FoodDelivery.GraphQL;

public class Mutations
{
    [Authorize(Roles = ["Restaurant"])]
    public async Task<ProductType?> CreateProduct(
        IResolverContext context,
        ClaimsPrincipal claimsPrincipal,
        [Service] Store store,
        string title,
        string description,
        string picture,
        decimal price,
        List<string> categories
    )
    {
        var accountId = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        if (accountId == null)
        {
            context.ReportError(
                ErrorBuilder.New()
                    .SetMessage("Unauthorized.")
                    .Build()
            );
            return null;
        }

        if (string.IsNullOrEmpty(picture))
        {
            context.ReportError(
                ErrorBuilder.New()
                    .SetMessage("Picture is required.")
                    .Build()
            );
            return null;
        }

        var product = Product.Create(accountId, title, description, picture, price);
        foreach (var categoryTitle in categories)
        {
            var category = store.Categories.SingleOrDefault(category => category.Title == categoryTitle);
            if (category != null)
            {
                category.Products.Add(product);
                product.Categories.Add(category);
            }
            else
            {
                context.ReportError(
                    ErrorBuilder.New()
                        .SetMessage("Invalid category.")
                        .Build()
                );
                return null;
            }
        }
        store.Products.Add(product);

        return ProductType.From(product);
    }
}