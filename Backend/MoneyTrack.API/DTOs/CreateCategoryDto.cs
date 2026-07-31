using System.ComponentModel.DataAnnotations;

namespace MoneyTrack.API.DTOs;

public class CreateCategoryDto
{
    [Required, StringLength(40, MinimumLength = 2)]
    public string Name { get; set; } = string.Empty;

    [Required, StringLength(12)]
    public string Icon { get; set; } = "📦";
}
