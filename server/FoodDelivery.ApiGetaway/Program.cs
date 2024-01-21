using FoodDelivery.Getaway;

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddRemoteGraphQL();

var app = builder.Build();

app.MapGraphQL("/graphql");

app.Run();