using System.Security.Claims;
using API.DTO;

namespace API.Services; 

public interface IAuthService {
    public Task<AuthDto> RegisterAsync(RegisterDto register);
    public Task<AuthDto> LoginAsync(LoginDto login);
    public Task<AuthDto> GetCurrentUser(ClaimsPrincipal user, HttpRequest request);
}