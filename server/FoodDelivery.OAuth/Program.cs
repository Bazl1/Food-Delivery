using FoodDelivery.OAuth.Data.Stores;
using FoodDelivery.OAuth.Services;
using FoodDelivery.OAuth;

var builder = WebApplication.CreateBuilder(args);

// Services
builder.Services
    .AddJwtAuthentication(builder.Configuration)
    .AddSingleton<FakeStore>(new FakeStore())
    .AddTransient<JwtTokenGenerator, JwtTokenGenerator>()
    .AddGraphQL()
    .AddHttpContextAccessor();

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();

app.MapGraphQL("/graphql");

app.Run();