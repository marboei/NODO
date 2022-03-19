using API.DTO;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;

namespace API.Controllers; 

[Route("api/account")]
[ApiController]
public class AccountController : ControllerBase {
    private readonly UserManager<User> _userManager;
    private readonly IAuthService _authService;

    public AccountController(UserManager<User> userManager, IAuthService authService) {
        _userManager = userManager;
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> LoginAsync(LoginDto loginDto) {
        if (!ModelState.IsValid) {
            return BadRequest(ModelState);
        }
        var result = await _authService.LoginAsync(loginDto);
        if (!result.IsAuthenticated) {
            return Unauthorized(result);
        }
        return Ok(result);
    }

    [HttpPost("register")]
    public async Task<IActionResult> RegisterAsync(RegisterDto registerDto) {
        if (!ModelState.IsValid) {
            return BadRequest(ModelState);
        }

        var result = await _authService.RegisterAsync(registerDto);

        if (!result.IsAuthenticated)
            return BadRequest(result);
        
        return Ok(result);
    }


    [Authorize]
    [HttpGet("currentuser")]
    public async Task<IActionResult> GetCurrentUser() {
        
        var dto = _authService.GetCurrentUser(User, Request);
        return Ok(dto.Result);
    }
    
}