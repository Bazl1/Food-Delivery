using System.Text;
using FoodDelivery.OAuth.GraphQL.Mutations;
using FoodDelivery.OAuth.GraphQL.Queries;
using FoodDelivery.OAuth.Settings;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace FoodDelivery.OAuth;

public static class DependencyInjection
{
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

    public static IServiceCollection AddGraphQL(this IServiceCollection services)
    {
        services
            .AddGraphQLServer()
            .AddAuthorization()
            .AddMutationType<AuthMutation>()
            .AddQueryType<AuthQuery>()
            .AddType<UploadType>()
            .UseDefaultPipeline();

        return services;
    }
}