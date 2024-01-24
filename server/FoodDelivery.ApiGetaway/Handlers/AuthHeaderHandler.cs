using System.Net.Http.Headers;

public class AuthHeaderHandler : DelegatingHandler
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public AuthHeaderHandler(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
    {
        var jwtToken = _httpContextAccessor.HttpContext?.Request.Headers["Authorization"].ToString();
        if (!string.IsNullOrEmpty(jwtToken))
        {
            if (!jwtToken.StartsWith("Bearer "))
            {
                jwtToken = "Bearer " + jwtToken;
            }
            
            request.Headers.Authorization = AuthenticationHeaderValue.Parse(jwtToken);
        }
        return base.SendAsync(request, cancellationToken);
    }
}
