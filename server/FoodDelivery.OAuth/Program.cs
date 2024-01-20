using FoodDelivery.OAuth.Data.Stores;
using FoodDelivery.OAuth.Services;
using FoodDelivery.OAuth;

var builder = WebApplication.CreateBuilder(args);

// CORS
const string CORS_POLICY = "CLIENT_CORS_POLICY";
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
    .AddSingleton<FakeStore>(new FakeStore())
    .AddTransient<JwtTokenGenerator, JwtTokenGenerator>()
    .AddGraphQL()
    .AddHttpContextAccessor();

var app = builder.Build();

app.UseCors();

app.UseAuthentication();
app.UseAuthorization();

app.MapGraphQL("/graphql");

app.Run();