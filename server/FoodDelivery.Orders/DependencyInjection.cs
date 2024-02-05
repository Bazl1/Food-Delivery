using System.Text;
using FoodDelivery.Orders.GraphQL;
using FoodDelivery.Orders.Settings;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using FoodDelivery.OAuth.gRPC;

namespace FoodDelivery.Orders;

public static class DependencyInjection
{
    public static IServiceCollection DI_AddAuthentication(this IServiceCollection services, IConfiguration configuration)
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

    public static IServiceCollection DI_AddGraphQL(this IServiceCollection services)
    {
        services
            .AddGraphQLServer()
            .AddAuthorization()
            .AddMutationType<Mutations>()
            .AddQueryType<Queries>()
            .UseDefaultPipeline();

        return services;
    }

    public static IServiceCollection DI_AddGrpc(this IServiceCollection services)
    {
        services
            .AddGrpcClient<Accounts.AccountsClient>(options =>
            {
                options.Address = new Uri("https://localhost:7254");
            });

        services
            .AddGrpcClient<Products.gRPC.Products.ProductsClient>(options =>
            {
                options.Address = new Uri("https://localhost:7098");
            });

        return services;
    }

    public static IServiceCollection DI_AddCorsWithOrigins(this IServiceCollection services, params string[] origins)
    {
        services.AddCors(corsOptions =>
        {
            corsOptions.AddDefaultPolicy(policyOptions =>
            {
                policyOptions
                    .WithOrigins(origins)
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
            });
        });

        return services;
    }
}