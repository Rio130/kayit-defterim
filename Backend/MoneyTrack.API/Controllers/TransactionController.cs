using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoneyTrack.API.Data;
using MoneyTrack.API.DTOs;
using MoneyTrack.API.Models;
using System.Security.Claims;

namespace MoneyTrack.API.Controllers;

[ApiController, Route("api/[controller]"), Authorize]
public class TransactionController : ControllerBase
{
    private readonly AppDbContext _context;
    public TransactionController(AppDbContext context) => _context = context;
    private int UserId => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    [HttpGet("list")]
    public async Task<IActionResult> List() => Ok(await _context.Transactions
        .AsNoTracking().Include(x => x.Category).Where(x => x.UserId == UserId)
        .OrderByDescending(x => x.Date).ThenByDescending(x => x.Id)
        .Select(x => new { x.Id, x.Amount, x.Description, x.Date, x.IsIncome, x.CategoryId, Category = x.Category.Name, CategoryIcon = x.Category.Icon })
        .ToListAsync());

    [HttpGet("{id:int}")]
    public async Task<IActionResult> Get(int id)
    {
        var item = await _context.Transactions.AsNoTracking().Include(x => x.Category)
            .Where(x => x.Id == id && x.UserId == UserId)
            .Select(x => new { x.Id, x.Amount, x.Description, x.Date, x.IsIncome, x.CategoryId, Category = x.Category.Name }).FirstOrDefaultAsync();
        return item is null ? NotFound(new { message = "İşlem bulunamadı" }) : Ok(item);
    }

    [HttpPost("create")]
    public async Task<IActionResult> Create(CreateTransactionDto dto)
    {
        if (!await _context.Categories.AnyAsync(x => x.Id == dto.CategoryId))
            return BadRequest(new { message = "Kategori bulunamadı" });
        var item = new Transaction { Amount = dto.Amount, Description = dto.Description.Trim(), IsIncome = dto.IsIncome, CategoryId = dto.CategoryId, UserId = UserId, Date = DateTime.Now };
        _context.Transactions.Add(item);
        await _context.SaveChangesAsync();
        return Ok(new { message = "İşlem başarıyla eklendi", transactionId = item.Id });
    }

    [HttpPut("update/{id:int}")]
    public async Task<IActionResult> Update(int id, CreateTransactionDto dto)
    {
        var item = await _context.Transactions.FirstOrDefaultAsync(x => x.Id == id && x.UserId == UserId);
        if (item is null) return NotFound(new { message = "İşlem bulunamadı" });
        if (!await _context.Categories.AnyAsync(x => x.Id == dto.CategoryId)) return BadRequest(new { message = "Kategori bulunamadı" });
        item.Amount = dto.Amount; item.Description = dto.Description.Trim(); item.IsIncome = dto.IsIncome; item.CategoryId = dto.CategoryId;
        await _context.SaveChangesAsync();
        return Ok(new { message = "İşlem güncellendi" });
    }

    [HttpDelete("delete/{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var item = await _context.Transactions.FirstOrDefaultAsync(x => x.Id == id && x.UserId == UserId);
        if (item is null) return NotFound(new { message = "İşlem bulunamadı" });
        _context.Transactions.Remove(item); await _context.SaveChangesAsync();
        return Ok(new { message = "İşlem silindi" });
    }
}
