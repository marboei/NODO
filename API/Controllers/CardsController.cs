using API.Data;
using API.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers; 

[Authorize]
public class CardsController : ControllerBase{
    
    private readonly ApplicationDbContext _context;
    private readonly UserManager<User> _userManager;

    public CardsController(ApplicationDbContext context, UserManager<User> userManager) {
        _context = context;
        _userManager = userManager;
    }

    [Route("api/projects/{projectId}/columns/{columnId}/cards")]
    [HttpGet]
    public async Task<IActionResult> GetAll(int projectId, int columnId) {
        if (_context.Projects.SingleOrDefault(p=>projectId == p.Id) == null) return NotFound($"No projects found with Id: {projectId}");
        if (_context.Columns.SingleOrDefault(c=>columnId == c.Id) == null) return NotFound($"No columns found with Id: {columnId}");

        var cards = await _context.Cards
            .Include(c => c.AssignedTo)
            .Include(c => c.Comments)
            .Include(c => c.Labels)
            .Where(c => c.ColumnId == columnId).OrderBy(c=> c.Order).ToListAsync();
        return Ok(cards);
    }

    [Route("api/projects/{projectId}/columns/{columnId}/cards/{cardId}")]
    [HttpGet]
    public async Task<IActionResult> GetById(int projectId, int columnId, int cardId) {
        var card = await _context.Cards
            .Include(c => c.AssignedTo)
            .Include(c => c.Comments)
            .Include(c => c.Labels)
            .Where(c => c.Id == cardId)
            .ToListAsync();
        return Ok(card[0]);
    }
    
    [Route("api/projects/{projectId}/columns/{columnId}/cards")]
    [HttpPost]
    public async Task<IActionResult> CreateAsync(int projectId, int columnId, [FromBody]CardDto dto) {

        if (_context.Projects.Find(projectId) == null) return NotFound($"No projects found with Id: {projectId}");
        if (_context.Columns.Find(columnId) == null) return NotFound($"No columns found with Id: {columnId}");

        var card = new Card {
            Title = dto.Title,
            ColumnId = columnId,
            Order = dto.Order ?? 0,
            Comments = new List<Comment>()
        };
        
        await _context.Cards.AddAsync(card);
        _context.SaveChanges();
        
        return Ok(card);
    }
    
    [Route("api/projects/{projectId}/columns/{columnId}/cards/{id}")]
    [HttpPut]
    public async Task<IActionResult> UpdateAsync(int projectId, int columnId, int id, [FromBody]CardDto dto) {

        if (_context.Projects.Find(projectId) == null) return NotFound($"No projects found with Id: {projectId}");
        if (_context.Columns.Find(columnId) == null) return NotFound($"No columns found with Id: {columnId}");

        var card = await _context.Cards.SingleOrDefaultAsync(c => c.Id == id);
        
        if(card == null) return NotFound($"No Cards found with Id: {id}");
        
        card.Title = dto.Title ?? card.Title;
        card.Description = dto.Description ?? card.Description;
        card.DueDate = dto.DueDate ?? card.DueDate;
        card.ColumnId = dto.ColumnId ?? card.ColumnId;
        card.Order = dto.Order ?? card.Order;
        card.Completed = dto.Completed ?? card.Completed;

        dto.AssignedTo?.ForEach(async userId => {
            var userAsync = await _userManager.FindByIdAsync(userId);
            card.AssignedTo?.Add(userAsync);
        });
        
        dto.Labels?.ForEach( label => {
            card.Labels?.Add(label);
        });

        

        _context.SaveChanges();
        
        return Ok(card);
    }
    
    [Route("api/projects/{projectId}/columns/{columnId}/cards/{id}")]
    [HttpDelete]
    public async Task<IActionResult> DeleteAsync(int projectId, int columnId, int id) {

        if (_context.Projects.Find(projectId) == null) return NotFound($"No projects found with Id: {projectId}");
        if (_context.Columns.Find(columnId) == null) return NotFound($"No columns found with Id: {columnId}");

        var card = await _context.Cards.SingleOrDefaultAsync(c => c.Id == id);
        
        if(card == null) return NotFound($"No Cards found with Id: {id}");

        _context.Remove(card);
        _context.SaveChanges();
        
        return Ok(card);
    }

    [Route("api/user/{userId}/cards")]
    [HttpGet]
    public async Task<IActionResult> GetAssignedCards(string userId) {
        var user = await _userManager.FindByIdAsync(userId);
        
        if(user == null) return NotFound($"No users found with Id: {userId}");
        
        var cards = await _context.Users
            .Include(u => u.CardsAssigned)
            .Where(u=>u.Id == userId).Select(u => u.CardsAssigned)
            .ToListAsync();

        var dtos = new List<UserAssignedCardDto>();
        
        cards[0].ForEach(card => {
            if (!card.Completed) {
                dtos.Add(new UserAssignedCardDto {
                    Title = card.Title,
                    CardId = card.Id,
                    ColumnId = card.ColumnId,
                    ProjectId = card.Column.ProjectId,
                    UserId = userId,
                    ProjectTitle = card.Column.Project.Title,
                    ColumnTitle = card.Column.Title
                });
            }
            
        });
        
        return Ok(dtos);
    }
}

