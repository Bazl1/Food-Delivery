using FoodDelivery.Products.Stores;
using FoodDelivery.OAuth.gRPC;
using Grpc.Core;
using FoodDelivery.Products.gRPC.Utils;

namespace FoodDelivery.Products.gRPC.Services;

public class ProductsService(
    FakeStore _store,
    Accounts.AccountsClient _accountsClient
) : Products.ProductsBase
{
    #region GetProdcutsByIds
    public override async Task<ProductsByIdsResponse> GetProdcutsByIds(
        ProductsByIdsRequest request,
        ServerCallContext context)
    {
        var response = new ProductsByIdsResponse();
        var products = _store.Products
            .Where(product => request.Ids.Contains(product.Id))
            .Select(product =>
            {
                var productResult = new Product
                {
                    Id = product.Id,
                    Title = product.Title,
                    Description = product.Description,
                    Picture = product.Picture,
                    Price = (double)product.Price,
                };

                var restaurantInfo = _accountsClient.GetRestaurantInfoOrNull(product.RestaurantId);
                if (restaurantInfo != null)
                {
                    productResult.Restaurant = new Restaurant
                    {
                        Id = restaurantInfo.Id,
                        Name = restaurantInfo.Name
                    };
                }

                productResult.Categories.AddRange(
                    product.Categories
                        .Select(category => new Category
                        {
                            Id = category.Id,
                            Title = category.Title
                        })
                );

                return productResult;
            })
            .ToList();
        response.Products.AddRange(products);
        return response;
    }
    #endregion GetProdcutsByIds
}