using System.ComponentModel.DataAnnotations;

namespace MoneyTrack.API.DTOs;

public class CreateTransactionDto
{
    [Range(0.01, 999999999, ErrorMessage = "Tutar sıfırdan büyük olmalıdır")]
    public decimal Amount { get; set; }

    [Required, StringLength(120, MinimumLength = 2)]
    public string Description { get; set; } = string.Empty;

    public bool IsIncome { get; set; }

    [Range(1, int.MaxValue, ErrorMessage = "Kategori seçilmelidir")]
    public int CategoryId { get; set; }
}
