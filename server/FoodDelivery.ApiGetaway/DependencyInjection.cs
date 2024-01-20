namespace FoodDelivery.Getaway;

public static class DependencyInjection
{
    private const string OAuthService = "OAuthService";

    public static IServiceCollection AddRemoteGraphQL(this IServiceCollection services)
    {
        services
            .AddHttpClient(OAuthService, client => client.BaseAddress = new Uri("http://localhost:5252/graphql"));

        services
            .AddGraphQLServer()
            .AddRemoteSchema(OAuthService, ignoreRootTypes: false);

        return services;
    }
}