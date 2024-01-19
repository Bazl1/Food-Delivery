namespace FoodDelivery.OAuth.GraphQL.Schemas;

public record SignInInput(
    string Email,
    string Password
);