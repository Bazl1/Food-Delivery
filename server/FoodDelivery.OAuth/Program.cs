using FoodDelivery.OAuth.Data.Stores;
using FoodDelivery.OAuth.Services;
using FoodDelivery.OAuth;
using HotChocolate.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// CORS
builder.Services
    .AddCors(corsOptions =>
    {
        corsOptions.AddDefaultPolicy(policyOptions =>
        {
            policyOptions
                .WithOrigins("http://localhost:5173", "http://localhost:5234")
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
        });
    });

// Services
builder.Services
    .AddJwtAuthentication(builder.Configuration)
    .AddSingleton<FakeStore>(new FakeStore())
    .AddGraphQL()
    .AddTransient<ImageService>()
    .AddTransient<JwtTokenGenerator>()
    .AddHttpContextAccessor();

var app = builder.Build();

app.UseCors();
app.UseStaticFiles();

app.UseAuthentication();
app.UseAuthorization();

app.MapGraphQL("/graphql");

app.Run();