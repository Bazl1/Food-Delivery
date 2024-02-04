namespace FoodDelivery.Orders.gRPC.Utils;

public static class ProductsClientExtensions
{
    public static async Task<List<Products.gRPC.Product>> GetProdcutsByIdsAsync(this Products.gRPC.Products.ProductsClient client, List<string> ids)
    {
        Console.WriteLine("GetProdcutsByIdsAsync");
        var request = new Products.gRPC.ProductsByIdsRequest();
        request.Ids.AddRange(ids);
        return (await client.GetProdcutsByIdsAsync(request)).Products.ToList();
    }
}