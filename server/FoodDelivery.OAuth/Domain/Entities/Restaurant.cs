namespace FoodDelivery.OAuth.Domain.Entities;

public class Restaurant
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string BannerUrl { get; set; } = null!;

    public static Restaurant Create(string id, string name, string description = "", string bannerUrl = "")
        => new Restaurant{ Id = id, Name = name, Description = description, BannerUrl = bannerUrl };
}