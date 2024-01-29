
using FoodDelivery.ImageStore.Services;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace FoodDelivery.ImageStore.Endpoints;

public static class ImagesEndpoints
{
    public static IEndpointRouteBuilder MapImagesEndpoints(this IEndpointRouteBuilder builder)
    {
        builder.MapPost("/", LoadImage);
        builder.MapDelete("/{url}", DeleteImage);

        return builder;
    }

    private static async Task DeleteImage(
        HttpContext context,
        string url)
    {
        Console.WriteLine(url);
    }

    private static async Task<Results<Ok<string>, BadRequest>> LoadImage(
        HttpContext context,
        [FromServices] ImageServce imageServce)
    {
        try
        {
            var fileName = await imageServce.AddAsync(context.Request.Form.Files.First());
            var url = $"http://localhost:5075/{fileName}";
            return TypedResults.Ok(url);
        }
        catch
        {
            Console.WriteLine("Error");
            return TypedResults.BadRequest();
        }
    }
}