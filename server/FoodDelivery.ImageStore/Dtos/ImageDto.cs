namespace FoodDelivery.Dtos;

public class ImageDto
{
    public string Url { get; set; } = null!;

    public static ImageDto Create(string url)
        => new ImageDto { Url = url };
}