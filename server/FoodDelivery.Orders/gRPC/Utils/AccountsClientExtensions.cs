using FoodDelivery.OAuth.gRPC;

namespace FoodDelivery.Orders.gRPC.Utils;

public static class AccountsClientExtensions
{
    public static CustomerInfoResponse? GetCustomerInfoOrNull(this Accounts.AccountsClient client, string id)
    {
        try
        {
            Console.WriteLine("GetCustomerInfoOrNull");
            return client.GetCustomerInfo(new CustomerInfoRequest { Id = id });
        }
        catch
        {
            return null;
        }
    }
}