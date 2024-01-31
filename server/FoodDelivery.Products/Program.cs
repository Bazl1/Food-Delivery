using FoodDelivery.Products;
using FoodDelivery.Products.Stores;

var builder = WebApplication.CreateBuilder(args);

// CORS
builder.Services
    .AddCors(corsOptions =>
    {
        corsOptions.AddDefaultPolicy(policyOptions =>
        {
            policyOptions
                .WithOrigins("http://localhost:5173", "http://localhost:5234", "http://localhost:5149")
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
        });
    });

builder.Services
    .AddHttpContextAccessor()
    .AddSingleton<Store>(new Store())
    .AddJwtAuthentication(builder.Configuration)
    .AddGraphQL();

var app = builder.Build();

app.UseCors();

app.UseAuthentication();
app.UseAuthorization();

app.MapGraphQL("/graphql");

app.Run();