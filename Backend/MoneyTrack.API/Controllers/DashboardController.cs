using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoneyTrack.API.Data;
using System.Security.Claims;

namespace MoneyTrack.API.Controllers;

[ApiController, Route("api/[controller]"), Authorize]
public class DashboardController : ControllerBase
{
    private readonly AppDbContext _context;
    public DashboardController(AppDbContext context) => _context = context;

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var items = await _context.Transactions.AsNoTracking().Include(x => x.Category).Where(x => x.UserId == userId).OrderByDescending(x => x.Date).ToListAsync();
        var income = items.Where(x => x.IsIncome).Sum(x => x.Amount);
        var expense = items.Where(x => !x.IsIncome).Sum(x => x.Amount);
        return Ok(new { balance = income - expense, totalIncome = income, totalExpense = expense, transactionCount = items.Count,
            lastTransactions = items.Take(5).Select(x => new { x.Id, x.Description, x.Amount, x.IsIncome, x.Date, Category = x.Category.Name }) });
    }
}
