using FoodDelivery.ImageStore.Endpoints;
using FoodDelivery.ImageStore.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddTransient<ImageServce>();

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

var app = builder.Build();

app.UseCors();

app.UseStaticFiles();

app.MapGroup("api/images")
    .MapImagesEndpoints();

app.Run();