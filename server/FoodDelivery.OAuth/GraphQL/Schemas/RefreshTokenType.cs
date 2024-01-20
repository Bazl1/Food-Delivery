namespace FoodDelivery.OAuth.GraphQL.Schemas;

public class RefreshTokenType
{
    public string AccessToken { get; set; } = null!;
    public string RefreshToken { get; set; } = null!;

    public static RefreshTokenType Create(string accessToken, string refreshToken)
        => new RefreshTokenType { AccessToken = accessToken, RefreshToken = refreshToken };
}