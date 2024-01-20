namespace FoodDelivery.OAuth.GraphQL.Schemas;

public record SignUpAsCustomerInput(
    string Email,
    string Password,
    string UserName,
    string Location
);