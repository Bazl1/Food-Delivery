namespace FoodDelivery.OAuth.GraphQL.Schemas;

public class AuthType
{
    public string AccessToken { get; set; } = null!;
    public string RefreshToken { get; set; } = null!;
    public AccountType Account { get; set; } = null!;

    public static AuthType Create(string accessToken, string refreshToken, AccountType account)
        => new AuthType { AccessToken = accessToken, RefreshToken = refreshToken, Account = account };
}