namespace MoneyTrack.API.Models
{
    public class User
    {
        public int Id { get; set; }


        public string FullName { get; set; } = string.Empty;


        public string Email { get; set; } = string.Empty;


        public string PasswordHash { get; set; } = string.Empty;


        public DateTime CreatedAt { get; set; } = DateTime.Now;



        // User -> Transactions ilişkisi
        public ICollection<Transaction> Transactions { get; set; }
            = new List<Transaction>();
    }
}