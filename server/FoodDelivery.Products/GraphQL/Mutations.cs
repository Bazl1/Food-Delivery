using System.Security.Claims;
using FoodDelivery.Domain.Entities;
using FoodDelivery.GraphQL.Types;
using FoodDelivery.Products.Stores;
using HotChocolate;
using HotChocolate.Authorization;
using HotChocolate.Resolvers;
using FoodDelivery.OAuth.gRPC;

namespace FoodDelivery.GraphQL;

public class Mutations
{
    [Authorize(Roles = ["Restaurant"])]
    public async Task<ProductType?> CreateProduct(
        IResolverContext context,
        ClaimsPrincipal claimsPrincipal,
        [Service] FakeStore store,
        [Service] Accounts.AccountsClient accountClient,
        string title,
        string description,
        string picture,
        string price,
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

        var product = Product.Create(accountId, title, description, picture, Decimal.Parse(price));
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

        RestaurantInfoResponse restaurantInfo = null;
        try
        {
            restaurantInfo = await accountClient.GetRestaurantInfoAsync(
                new RestaurantInfoRequest
                {
                    Id = accountId
                }
            );
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error calling GetRestaurantInfoAsync: {ex.Message}");
            restaurantInfo = null;
        }

        return ProductType.From(product, restaurantInfo);
    }

    [Authorize(Roles = ["Restaurant"])]
    public async Task<bool> DeleteProduct(
        IResolverContext context,
        ClaimsPrincipal claimsPrincipal,
        [Service] FakeStore store,
        string id)
    {
        var accountId = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        if (store.Products.SingleOrDefault(product => product.Id == id) is not Product product)
        {
            context.ReportError(
                ErrorBuilder.New()
                    .SetMessage("Product with given id is not found.")
                    .Build()
            );
            return false;
        }

        if (product.RestaurantId != accountId)
        {
            context.ReportError(
                ErrorBuilder.New()
                    .SetMessage("Permission denied.")
                    .Build()
            );
            return false;
        }

        store.Products.Remove(product);

        return true;
    }
}