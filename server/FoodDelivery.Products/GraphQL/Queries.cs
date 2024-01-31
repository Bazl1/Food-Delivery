using FoodDelivery.Domain.Entities;
using FoodDelivery.GraphQL.Types;
using FoodDelivery.Products.Stores;
using HotChocolate;
using System.Linq;
using HotChocolate.Resolvers;

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

    public async Task<IEnumerable<ProductType>> Search(
        IResolverContext context,
        [Service] FakeStore store,
        [Service] GrpcService.Restaurant.RestaurantClient _restaurantClient,
        int page,
        int limit = 10,
        string? restaurantId = null,
        List<string>? categories = null,
        string? predicate = null)
    {

        return store.Products
            .Where(product =>
                (restaurantId == null || product.RestaurantId == restaurantId) &&
                (categories == null || product.Categories.Any(category => categories.Any(categoryTitle => categoryTitle == category.Title))) &&
                (predicate == null || (product.Title.ToUpper().Contains(predicate.ToUpper()) || product.Description.ToUpper().Contains(predicate.ToUpper())))
            )
            .Skip(page * limit)
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
}