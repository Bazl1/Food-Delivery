using FoodDelivery.Domain.Entities;
using FoodDelivery.GraphQL.Types;
using FoodDelivery.Products.Stores;
using HotChocolate.Resolvers;
using FoodDelivery.Products.GraphQL.Types;

namespace FoodDelivery.GraphQL;

public class Queries
{
    public async Task<ProductType?> GetProductById(
        IResolverContext context,
        [Service] FakeStore store,
        [Service] GrpcService.Restaurant.RestaurantClient _restaurantClient,
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

        GrpcService.RestaurantInfoResponse restaurantInfo = null;
        try
        {
            restaurantInfo = await _restaurantClient.GetRestaurantInfoAsync(
                new GrpcService.RestaurantInfoRequest
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

    public async Task<ProductsType> Search(
        IResolverContext context,
        [Service] FakeStore store,
        [Service] GrpcService.Restaurant.RestaurantClient _restaurantClient,
        int page,
        int limit = 4,
        string? restaurantId = null,
        List<string>? categories = null,
        string? predicate = null)
    {
        if (page <= 0)
        {
            page = 1;
        }

        var products = store.Products
            .Where(product =>
                (restaurantId == null || product.RestaurantId == restaurantId) &&
                (categories == null || product.Categories.Any(category => categories.Any(categoryTitle => categoryTitle == category.Title))) &&
                (predicate == null || (product.Title.ToUpper().Contains(predicate.ToUpper()) || product.Description.ToUpper().Contains(predicate.ToUpper())))
            )
            .ToList();

        int pageCount;
        List<ProductType> productsPage;

        if (limit == -1)
        {
            pageCount = 1;
            productsPage = products
                .Select(product =>
                {
                    GrpcService.RestaurantInfoResponse restaurantInfo = null;
                    try
                    {
                        restaurantInfo = _restaurantClient.GetRestaurantInfo(
                            new GrpcService.RestaurantInfoRequest { Id = product.RestaurantId }
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
                    GrpcService.RestaurantInfoResponse restaurantInfo = null;
                    try
                    {
                        restaurantInfo = _restaurantClient.GetRestaurantInfo(
                            new GrpcService.RestaurantInfoRequest { Id = product.RestaurantId }
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


        return ProductsType.From(productsPage, pageCount);
    }
}