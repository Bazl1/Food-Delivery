namespace FoodDelivery.Getaway.Middlewares;

public class ApiGatewayMiddleware
{
    private readonly RequestDelegate _next;
    private readonly HttpClient _httpClient;

    public ApiGatewayMiddleware(RequestDelegate next, IHttpClientFactory httpClientFactory)
    {
        _next = next ?? throw new ArgumentNullException(nameof(next));
        _httpClient = httpClientFactory.CreateClient();
    }

    public async Task Invoke(HttpContext context)
    {
        if (context.Request.Path.StartsWithSegments("/api/images"))
        {
            await ProxyRequest(context, $"http://localhost:5075{context.Request.Path}");
        }
        else
        {
            await _next(context);
        }
    }

    private async Task ProxyRequest(HttpContext context, string targetUri)
    {
        var targetRequest = new HttpRequestMessage();

        foreach (var header in context.Request.Headers)
        {
            targetRequest.Headers.TryAddWithoutValidation(header.Key, header.Value.ToArray());
        }

        targetRequest.Method = new HttpMethod(context.Request.Method);
        targetRequest.RequestUri = new Uri(targetUri);
        targetRequest.Content = new StreamContent(context.Request.Body);

        foreach (var header in context.Request.Headers)
        {
            targetRequest.Content.Headers.TryAddWithoutValidation(header.Key, header.Value.ToArray());
        }

        using (var response = await _httpClient.SendAsync(targetRequest))
        {
            await context.Response.WriteAsync(await response.Content.ReadAsStringAsync());
        }
    }
}