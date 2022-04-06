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

        var cards = await _context.Cards.Where(c => c.ColumnId == columnId).ToListAsync();
        return Ok(cards);
    }

    [Route("api/projects/{projectId}/columns/{columnId}/cards/{cardId}")]
    [HttpGet]
    public async Task<IActionResult> GetById(int projectId, int columnId, int cardId) {
        var card = await _context.Cards.SingleOrDefaultAsync(c => c.Id == cardId);
        return Ok(card);
    }
    
    [Route("api/projects/{projectId}/columns/{columnId}/cards")]
    [HttpPost]
    public async Task<IActionResult> CreateAsync(int projectId, int columnId, [FromBody]CardDto dto) {

        if (_context.Projects.Find(projectId) == null) return NotFound($"No projects found with Id: {projectId}");
        if (_context.Columns.Find(columnId) == null) return NotFound($"No columns found with Id: {columnId}");

        var card = new Card {
            Title = dto.Title,
            ColumnId = columnId
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
        card.Label = dto.Label ?? card.Label;
        card.DueDate = dto.DueDate ?? card.DueDate;
        card.ColumnId = dto.ColumnId ?? card.ColumnId;

        dto.AssignedTo?.ForEach(async userId => {
            var userAsync = await _userManager.FindByIdAsync(userId);
            card.AssignedTo?.Add(userAsync);
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
}