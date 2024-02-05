using FoodDelivery.OAuth.gRPC;

namespace FoodDelivery.Products.gRPC.Utils;

public static class AccountsClientExtensions
{
    public static RestaurantInfoResponse? GetRestaurantInfoOrNull(this Accounts.AccountsClient client, string id)
    {
        try
        {
            return client.GetRestaurantInfo(new RestaurantInfoRequest { Id = id });
        }
        catch
        {
            return null;
        }
    }
}