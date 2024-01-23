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
    .AddJwtAuthentication(builder.Configuration)
    .AddRemoteGraphQL()
    .AddHttpContextAccessor();

var app = builder.Build();

app.UseCors();

app.UseAuthentication();
app.UseAuthorization();

app.MapGraphQL("/graphql");

app.Run();