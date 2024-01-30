namespace FoodDelivery.Clients;

public class OAuthClient : IDisposable
{
    public const string BASE_URI = "";
    private readonly HttpClient _httpClient;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public OAuthClient(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
        _httpClient = new HttpClient();
        _httpClient.BaseAddress = new Uri(BASE_URI);
    }

    public void Dispose()
    {
        _httpClient.Dispose();
    }
}