namespace FoodDelivery.OAuth.GraphQL.Schemas;

public class SignUpAsCustomerType
{
    public string AccessToken { get; set; } = null!;
    public string RefreshToken { get; set; } = null!;
    public CustomerType Customer { get; set; } = null!;

    public static SignUpAsCustomerType Create(string accessToken, string refreshToken, CustomerType customer)
        => new SignUpAsCustomerType { AccessToken = accessToken, RefreshToken = refreshToken, Customer = customer };
}