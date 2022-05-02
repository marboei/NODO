using API.Data;
using API.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers; 

[Authorize]
[ApiController]
public class LabelsController : ControllerBase {
    private readonly ApplicationDbContext _context;

    public LabelsController(ApplicationDbContext context) {
        _context = context;
    }

    [Route("api/projects/{projectId}/columns/{columnId}/cards/{cardId}/labels")]
    [HttpGet]
    public async Task<IActionResult> GetLabels(int projectId, int columnId, int cardId) {
        var labels = _context.Cards.Include(c => c.Labels).Where(c => c.Id == cardId).Select(c => c.Labels).ToListAsync();
        return Ok(labels.Result[0]);
    }
    
    [Route("api/projects/{projectId}/columns/{columnId}/cards/{cardId}/labels")]
    [HttpPost]
    public async Task<IActionResult> AddLabel(int projectId, int columnId, int cardId, [FromBody]AddLabelDto dto) {
        var card = await _context.Cards.FindAsync(cardId);
        if (card is not null) {
            if (card.Labels is null) {
                card.Labels = new List<Label>();
            }

            var label = new Label() {
                Text = dto.Text ?? null,
                Color = dto.Color ?? null 
            };

            card.Labels.Add(label);
            _context.SaveChanges();

            return Ok(card);
        }
        else {
            return NotFound();
        }
    }
    
    [Route("api/projects/{projectId}/columns/{columnId}/cards/{cardId}/labels/{id}")]
    [HttpDelete]
    public async Task<IActionResult> DeleteComment(int projectId, int columnId, int cardId, int id) {
        var card = await _context.Cards.FindAsync(cardId);
        card.Labels = card.Labels.Where(l => l.Id != id).ToList();
        _context.SaveChanges();
        return Ok(card);
    }
}