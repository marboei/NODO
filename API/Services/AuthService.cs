using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using API.DTO;
using Microsoft.AspNetCore.Identity;
using Microsoft.Net.Http.Headers;

namespace API.Services; 

public class AuthService : IAuthService {
    private readonly UserManager<User> _userManager;
    private readonly TokenService _tokenService;

    public AuthService(UserManager<User> userManager, TokenService tokenService) {
        _userManager = userManager;
        _tokenService = tokenService;
    }
    
    public async Task<AuthDto> RegisterAsync(RegisterDto model) {
        if (await _userManager.FindByEmailAsync(model.Email) is not null)
            return new AuthDto {Message = "Email is already registered!", IsAuthenticated = false};
        
        if (await _userManager.FindByEmailAsync(model.UserName) is not null)
            return new AuthDto {Message = "Username is already registered!", IsAuthenticated = false};

        var user = new User {
            UserName = model.UserName,
            Email = model.Email,
            FirstName = model.FirstName,
            LastName = model.LastName,
        };

        var result = await _userManager.CreateAsync(user, model.Password);
        if (!result.Succeeded) {
            var errors = string.Empty;
            foreach (var error in result.Errors) {
                errors += $"{error.Description}, ";
            }

            return new AuthDto {Message = errors, IsAuthenticated = false};
        }

        await _userManager.AddToRoleAsync(user, "Member");

        var jwtSecurityToken = await _tokenService.GenerateToken(user);
        return new AuthDto {
            Id = user.Id,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Email = user.Email,
            ExpiresOn = jwtSecurityToken.ValidTo,
            IsAuthenticated = true,
            Roles = new List<string> {"Member"},
            Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken),
            UserName = user.UserName
        };
    }

    public async Task<AuthDto> LoginAsync(LoginDto login) {
        var user = await _userManager.FindByNameAsync(login.UserName);
        if (user is null || await _userManager.CheckPasswordAsync(user, login.Password) == false)
            return new AuthDto {Message = "Username or password is incorrect!", IsAuthenticated = false};

        var jwtSecurityToken = await _tokenService.GenerateToken(user);
        return new AuthDto {
            Id = user.Id,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Email = user.Email,
            ExpiresOn = jwtSecurityToken.ValidTo,
            IsAuthenticated = true,
            Roles = new List<string> {"Member"},
            Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken),
            UserName = user.UserName
        };
    }

    public async Task<AuthDto> GetCurrentUser(ClaimsPrincipal user, HttpRequest request) {
        var userr = await _userManager.FindByNameAsync(user.Identity.Name);
        var accessToken = request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", String.Empty);
        var authDto = new AuthDto {
            Id = userr.Id,
            Email = userr.Email,
            ExpiresOn = DateTime.Now.AddDays(7),
            IsAuthenticated = true,
            Roles = new List<string> {"Member"},
            Token = accessToken,
            UserName = userr.UserName
        };

        return authDto;
    }
    
    
}