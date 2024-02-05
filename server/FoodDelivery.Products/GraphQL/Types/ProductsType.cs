using FoodDelivery.GraphQL.Types;

namespace FoodDelivery.Products.GraphQL.Types;

public class ProductsType
{
    public IEnumerable<ProductType>? Products { get; set; } = null;
    public int? PageCount { get; set; } = null;
    public int? ProductCount { get; set; } = null;

    public static ProductsType From(IEnumerable<ProductType> products, int pageCount, int productCount)
        => new ProductsType
        {
            Products = products,
            PageCount = pageCount,
            ProductCount = productCount
        };
}