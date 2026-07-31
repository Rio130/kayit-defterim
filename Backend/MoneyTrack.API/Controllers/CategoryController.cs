using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoneyTrack.API.Data;
using MoneyTrack.API.DTOs;
using MoneyTrack.API.Models;

namespace MoneyTrack.API.Controllers;

[ApiController, Route("api/[controller]"), Authorize]
public class CategoryController : ControllerBase
{
    private readonly AppDbContext _context;
    public CategoryController(AppDbContext context) => _context = context;

    [HttpGet("list")]
    public async Task<IActionResult> List() => Ok(await _context.Categories.AsNoTracking()
        .OrderBy(x => x.Name).Select(x => new { x.Id, x.Name, x.Icon, TransactionCount = x.Transactions.Count }).ToListAsync());

    [HttpPost("create")]
    public async Task<IActionResult> Create(CreateCategoryDto dto)
    {
        var name = dto.Name.Trim();
        if (await _context.Categories.AnyAsync(x => x.Name.ToLower() == name.ToLower())) return Conflict(new { message = "Bu kategori zaten var" });
        var item = new Category { Name = name, Icon = dto.Icon.Trim() };
        _context.Categories.Add(item); await _context.SaveChangesAsync();
        return Ok(new { message = "Kategori oluşturuldu", categoryId = item.Id });
    }

    [HttpPut("update/{id:int}")]
    public async Task<IActionResult> Update(int id, CreateCategoryDto dto)
    {
        var item = await _context.Categories.FindAsync(id);
        if (item is null) return NotFound(new { message = "Kategori bulunamadı" });
        var name = dto.Name.Trim();
        if (await _context.Categories.AnyAsync(x => x.Id != id && x.Name.ToLower() == name.ToLower())) return Conflict(new { message = "Bu kategori zaten var" });
        item.Name = name; item.Icon = dto.Icon.Trim(); await _context.SaveChangesAsync();
        return Ok(new { message = "Kategori güncellendi" });
    }

    [HttpDelete("delete/{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var item = await _context.Categories.Include(x => x.Transactions).FirstOrDefaultAsync(x => x.Id == id);
        if (item is null) return NotFound(new { message = "Kategori bulunamadı" });
        if (item.Transactions.Count != 0) return Conflict(new { message = "Bu kategori işlemlerde kullanıldığı için silinemez" });
        _context.Categories.Remove(item); await _context.SaveChangesAsync();
        return Ok(new { message = "Kategori silindi" });
    }
}
