using FoodDelivery.GraphQL.Types;

namespace FoodDelivery.Products.GraphQL.Types;

public class ProductsType
{
    public IEnumerable<ProductType> Products { get; set; }
    public int PageCount { get; set; }

    public static ProductsType From(IEnumerable<ProductType> products, int pageCount)
        => new ProductsType
        {
            Products = products,
            PageCount = pageCount
        };
}