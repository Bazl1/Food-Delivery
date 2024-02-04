using FoodDelivery.Products;
using FoodDelivery.Products.gRPC.Services;
using FoodDelivery.Products.Stores;

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .DI_AddCorsWithOrigins(
        "http://localhost:5173",
        "http://localhost:5234",
        "http://localhost:5277",
        "http://localhost:5149")
    .AddHttpContextAccessor()
    .AddSingleton<FakeStore>(new FakeStore())
    .DI_AddAuthentication(builder.Configuration)
    .DI_AddGraphQL()
    .DI_AddGrpc();

var app = builder.Build();

app.UseCors();

app.UseAuthentication();
app.UseAuthorization();

app.MapGraphQL("/graphql");
app.MapGrpcService<ProductsService>();

app.Run();