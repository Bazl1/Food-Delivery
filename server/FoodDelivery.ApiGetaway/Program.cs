using FoodDelivery.Getaway;

var builder = WebApplication.CreateBuilder(args);

// CORS
builder.Services
    .AddCors(corsOptions => {
        corsOptions.AddDefaultPolicy(policyOptions => {
            policyOptions
                .WithOrigins("http://localhost:5173")
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
        });
    });

// Services
builder.Services
    .AddRemoteGraphQL();

var app = builder.Build();

app.MapGraphQL("/graphql");

app.Run();