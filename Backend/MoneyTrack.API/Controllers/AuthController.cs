using Microsoft.AspNetCore.Mvc;
using MoneyTrack.API.Data;
using MoneyTrack.API.DTOs;
using MoneyTrack.API.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MoneyTrack.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {

        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;


        public AuthController(
            AppDbContext context,
            IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }



        // REGISTER

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {

            var existingUser = _context.Users
                .FirstOrDefault(x => x.Email == dto.Email);



            if (existingUser != null)
            {
                return BadRequest(new
                {
                    message = "Bu email zaten kayıtlı"
                });
            }



            var user = new User
            {
                FullName = dto.FullName,
                Email = dto.Email,

                PasswordHash = BCrypt.Net.BCrypt
                    .HashPassword(dto.Password),

                CreatedAt = DateTime.Now
            };



            _context.Users.Add(user);

            await _context.SaveChangesAsync();



            return Ok(new
            {
                message = "Kullanıcı başarıyla oluşturuldu",
                userId = user.Id
            });

        }





        // LOGIN

        [HttpPost("login")]
        public IActionResult Login(LoginDto dto)
        {

            var user = _context.Users
                .FirstOrDefault(x => x.Email == dto.Email);



            if (user == null)
            {
                return BadRequest(new
                {
                    message = "Kullanıcı bulunamadı"
                });
            }




            bool passwordMatch =
                BCrypt.Net.BCrypt.Verify(
                    dto.Password,
                    user.PasswordHash
                );




            if (!passwordMatch)
            {
                return BadRequest(new
                {
                    message = "Şifre hatalı"
                });
            }




            var claims = new[]
            {
                new Claim(
                    ClaimTypes.NameIdentifier,
                    user.Id.ToString()
                ),

                new Claim(
                    ClaimTypes.Email,
                    user.Email
                ),

                new Claim(
                    ClaimTypes.Name,
                    user.FullName
                )
            };





            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(
                    _configuration["Jwt:Key"]!
                )
            );




            var credentials = new SigningCredentials(
                key,
                SecurityAlgorithms.HmacSha256
            );




            var token = new JwtSecurityToken(

                issuer: _configuration["Jwt:Issuer"],

                audience: _configuration["Jwt:Audience"],

                claims: claims,

                expires: DateTime.Now.AddHours(2),

                signingCredentials: credentials

            );




            var tokenString =
                new JwtSecurityTokenHandler()
                .WriteToken(token);





            return Ok(new
            {
                message = "Giriş başarılı",

                token = tokenString,

                userId = user.Id,

                fullName = user.FullName,

                email = user.Email
            });

        }

    }
}