namespace FoodDelivery.OAuth.GraphQL.Schemas;

public record SignUpAsRestaurantInput(
    string Email,
    string Password,
    string Name,
    string Description = ""
);