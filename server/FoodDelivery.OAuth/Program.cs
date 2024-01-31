using FoodDelivery.OAuth.Data.Stores;
using FoodDelivery.OAuth.Services;
using FoodDelivery.OAuth;
using FoodDelivery.OAuth.gRPC.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .DI_AddCorsWithOrigins(
        "http://localhost:5173",
        "http://localhost:5234",
        "http://localhost:5149")
    .DI_AddAuthentication(builder.Configuration)
    .AddSingleton<FakeStore>(new FakeStore())
    .DI_AddGraphQL()
    .AddTransient<JwtTokenGenerator, JwtTokenGenerator>()
    .DI_AddGrpc()
    .AddHttpContextAccessor();

var app = builder.Build();

app.UseCors();

app.UseAuthentication();
app.UseAuthorization();

app.MapGraphQL("/graphql");
app.MapGrpcService<RestaurantService>();

app.Run();