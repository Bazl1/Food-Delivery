using FoodDelivery.Domain.Entities;
using FoodDelivery.GraphQL.Types;
using FoodDelivery.Products.Stores;
using HotChocolate.Resolvers;
using FoodDelivery.Products.GraphQL.Types;
using FoodDelivery.Products.gRPC.Utils;
using FoodDelivery.OAuth.gRPC;
using System.Security.Claims;

namespace FoodDelivery.GraphQL;

#pragma warning disable CS1998, CS8604, CS8602, CS0168

public class Queries
{
    public async Task<ProductType?> GetProductById(
        IResolverContext context,
        ClaimsPrincipal claimsPrincipal,
        [Service] FakeStore store,
        [Service] Accounts.AccountsClient accountClient,
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

        RestaurantInfoResponse? restaurantInfo = null;
        try
        {
            restaurantInfo = await accountClient.GetRestaurantInfoAsync(
                new RestaurantInfoRequest
                {
                    Id = id
                }
            );
        }
        catch
        {
            restaurantInfo = null;
        }

        return ProductType.From(product, restaurantInfo);
    }

    public async Task<List<ProductType>> GetProductsByIds(
        IResolverContext context,
        [Service] FakeStore store,
        [Service] Accounts.AccountsClient accountClient,
        List<string> ids)
    {
        return store.Products
            .Where(product => ids.Contains(product.Id))
            .Select(product => ProductType.From(product, accountClient.GetRestaurantInfoOrNull(product.RestaurantId)))
            .ToList();
    }

    public async Task<ProductsType> Search(
        IResolverContext context,
        [Service] FakeStore store,
        [Service] Accounts.AccountsClient accountClient,
        int page,
        int limit = 4,
        string? restaurantId = null,
        string? category = null,
        string? predicate = null,
        string? filtering = null)
    {
        if (page <= 0)
        {
            page = 1;
        }

        var products = store.Products
            .Where(product =>
                (restaurantId == null || product.RestaurantId == restaurantId) &&
                (category == null || product.Categories.Any(item => item.Title == category)) &&
                (predicate == null || (
                    predicate.ToUpper().Split().Any(keyWord => product.Title.ToUpper().Contains(keyWord)) ||
                    predicate.ToUpper().Split().Any(keyWord => product.Description.ToUpper().Contains(keyWord)))
                )
            )
            .ToList();

        int pageCount;
        List<ProductType> productsPage;

        if (filtering != null)
        {
            switch (filtering)
            {
                case "PriceLowestFirst":
                    {
                        products = products
                            .OrderBy(product => product.Price)
                            .ToList();
                    }
                    break;

                case "PriceHighestFirst":
                    {
                        products = products
                            .OrderByDescending(product => product.Price)
                            .ToList();
                    }
                    break;
            }
        }

        if (limit == -1)
        {
            pageCount = 1;
            productsPage = products
                .Select(product =>
                {
                    RestaurantInfoResponse? restaurantInfo = null;
                    try
                    {
                        restaurantInfo = accountClient.GetRestaurantInfo(
                            new RestaurantInfoRequest { Id = product.RestaurantId }
                        );
                    }
                    catch
                    {
                        restaurantInfo = null;
                    }
                    return ProductType.From(product, restaurantInfo);
                })
                .ToList();
        }
        else
        {
            pageCount = (int)Math.Ceiling((float)products.Count() / (float)limit);
            productsPage = products
                .Skip((page - 1) * limit)
                .Take(limit)
                .Select(product =>
                {
                    RestaurantInfoResponse? restaurantInfo = null;
                    try
                    {
                        restaurantInfo = accountClient.GetRestaurantInfo(
                            new RestaurantInfoRequest { Id = product.RestaurantId }
                        );
                    }
                    catch
                    {
                        restaurantInfo = null;
                    }
                    return ProductType.From(product, restaurantInfo);
                })
                .ToList();
        }

        return ProductsType.From(productsPage, pageCount, products.Count);
    }
}