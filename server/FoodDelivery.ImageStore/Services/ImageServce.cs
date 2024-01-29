using Microsoft.AspNetCore.Http;

namespace FoodDelivery.ImageStore.Services;

public class ImageServce(
    IWebHostEnvironment _webHostEnvironment
)
{
    public async Task<string> AddAsync(IFormFile image)
    {
        if (image == null || image.Length == 0)
            throw new ArgumentException("Invalid file");

        var fileName = Guid.NewGuid().ToString() + Path.GetExtension(image.FileName);
        var uploadPath = Path.Combine(_webHostEnvironment.WebRootPath, fileName);

        using (var stream = new FileStream(uploadPath, FileMode.Create))
        {
            image.CopyTo(stream);
        }

        return fileName;
    }

    public async Task RemoveAsync(string fileName)
    {
        var filePath = Path.Combine(_webHostEnvironment.WebRootPath, fileName);

        if (File.Exists(filePath))
        {
            File.Delete(filePath);
        }
        else
        {
            throw new FileNotFoundException("File not found", filePath);
        }
    }
}