namespace FoodDelivery.OAuth.GraphQL.Schemas;

public class VerifyType
{
    public string? Role { get; set; } = null;
    public bool? IsAuth { get; set; } = null;

    public static VerifyType Create(string role, bool isAuth)
        => new VerifyType
        {
            Role = role,
            IsAuth = isAuth
        };
}