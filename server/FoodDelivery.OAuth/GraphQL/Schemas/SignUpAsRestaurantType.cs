namespace FoodDelivery.OAuth.GraphQL.Schemas;

public class SignUpAsRestaurantType
{
    public string AccessToken { get; set; } = null!;
    public string RefreshToken { get; set; } = null!;
    public RestaurantType Restaurant { get; set; } = null!;

    public static SignUpAsRestaurantType Create(string accessToken, string refreshToken, RestaurantType restaurant)
        => new SignUpAsRestaurantType { AccessToken = accessToken, RefreshToken = refreshToken, Restaurant = restaurant };
}