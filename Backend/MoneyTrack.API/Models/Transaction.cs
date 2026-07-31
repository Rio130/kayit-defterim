namespace MoneyTrack.API.Models
{
    public class Transaction
    {
        public int Id { get; set; }


        public decimal Amount { get; set; }


        public string Description { get; set; } = string.Empty;


        public DateTime Date { get; set; } = DateTime.Now;


        public bool IsIncome { get; set; }



        // User ilişkisi

        public int UserId { get; set; }


        public User User { get; set; } = null!;



        // Category ilişkisi

        public int CategoryId { get; set; }


        public Category Category { get; set; } = null!;

    }
}