namespace MoneyTrack.API.Models
{
    public class Category
    {
        public int Id { get; set; }


        public string Name { get; set; } = string.Empty;


        public string Icon { get; set; } = string.Empty;



        // Category -> Transactions ilişkisi

        public ICollection<Transaction> Transactions { get; set; }
            = new List<Transaction>();

    }
}