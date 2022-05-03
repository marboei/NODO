using API.Data;
using API.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers; 

[Authorize]
[ApiController]
public class AssignedToController : ControllerBase {
    private readonly ApplicationDbContext _context;
    private readonly UserManager<User> _userManager;


    public AssignedToController(ApplicationDbContext context, UserManager<User> userManager) {
        _context = context;
        _userManager = userManager;
    }

    [Route("api/projects/{projectId}/columns/{columnId}/cards/{cardId}/assignedTo")]
    [HttpGet]
    public async Task<IActionResult> GetAssignedTo(int projectId, int columnId, int cardId) {
        var assignedTo = _context.Cards.Include(c => c.AssignedTo).Where(c => c.Id == cardId).Select(c => c.AssignedTo).ToListAsync();
        return Ok(assignedTo.Result[0]);
    }
    
    [Route("api/projects/{projectId}/columns/{columnId}/cards/{cardId}/assignedTo")]
    [HttpPost]
    public async Task<IActionResult> AddLabel(int projectId, int columnId, int cardId, [FromBody]AssignedToDto dto) {
        var card = await _context.Cards.Include(c => c.AssignedTo).Where(c=> c.Id == cardId).ToListAsync();
        if (card[0] is not null) {
            if (card[0].AssignedTo is null) {
                card[0].AssignedTo = new List<User>();
            }

            var userAsync = await _userManager.FindByIdAsync(dto.UserId);

            card[0].AssignedTo.Add(userAsync);
            _context.SaveChanges();

            return Ok(card[0]);
        }
        else {
            return NotFound();
        }
    }
    
    [Route("api/projects/{projectId}/columns/{columnId}/cards/{cardId}/assignedTo/{id}")]
    [HttpDelete]
    public async Task<IActionResult> DeleteComment(int projectId, int columnId, int cardId, string id) {
        var card = await _context.Cards.Include(c => c.AssignedTo).Where(c=> c.Id == cardId).ToListAsync();
        card[0].AssignedTo = card[0].AssignedTo.Where(u => u.Id != id).ToList();
        _context.SaveChanges();
        return Ok(card[0]);
    }
}