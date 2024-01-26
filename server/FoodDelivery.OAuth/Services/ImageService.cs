namespace FoodDelivery.OAuth.Services;

public class ImageService(
    IWebHostEnvironment _webHostEnvironment
)
{
    public async Task<string> Create(IFile file)
    {
        if (file == null || file.Length == 0)
            throw new ArgumentException("Invalid file");

        var fileName = $"{Guid.NewGuid()}.{System.IO.Path.GetExtension(file.Name)}";
        var filePath = System.IO.Path.Combine(_webHostEnvironment.WebRootPath, "images", fileName);

        if (!Directory.Exists(filePath))
            Directory.CreateDirectory(filePath);

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        return $"images/{fileName}";
    }

    public void Remove(string url)
    {
        var filePath = System.IO.Path.Combine(_webHostEnvironment.WebRootPath, "images", url.Split('/').Last());
        if (File.Exists(filePath))
        {
            File.Delete(filePath);
        }
    }
}