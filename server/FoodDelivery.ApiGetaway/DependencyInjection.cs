using System.Net.Http.Headers;
using System.Text;
using FoodDelivery.OAuth.Settings;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace FoodDelivery.Getaway;

public static class DependencyInjection
{
    private const string OAuthService = "OAuthService";

    public static IServiceCollection AddJwtAuthentication(this IServiceCollection services, IConfiguration configuration)
    {
        services
            .Configure<JwtSettings>(configuration.GetSection(nameof(JwtSettings)));

        services
            .AddAuthentication(authenticationOptions =>
            {
                authenticationOptions.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer(jwtBearer =>
                {
                    var jwtSettings = new JwtSettings();
                    configuration.GetSection(nameof(JwtSettings)).Bind(jwtSettings);
                    jwtBearer.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateAudience = true,
                        ValidateIssuer = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidAudience = jwtSettings.Audience,
                        ValidIssuer = jwtSettings.Issuer,
                        IssuerSigningKey = new SymmetricSecurityKey(
                            Encoding.ASCII.GetBytes(jwtSettings.SecretKey)
                        )
                    };
                });

        services.AddAuthorization();

        return services;
    }

    public static IServiceCollection AddRemoteGraphQL(this IServiceCollection services)
    {
        services
            .AddHttpClient(OAuthService, client =>
            {
                client.BaseAddress = new Uri("http://localhost:5252/graphql");
            })
            .AddHttpMessageHandler((provider) =>
            {
                var httpContextAccessor = provider.GetRequiredService<IHttpContextAccessor>();
                return new AuthHeaderHandler(httpContextAccessor);
            });

        services
            .AddGraphQLServer()
            .AddRemoteSchema(OAuthService, ignoreRootTypes: false);

        return services;
    }
}