using API.Data;
using API.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers; 
[Authorize]
[ApiController]
public class ColumnsController : ControllerBase {
    private readonly ApplicationDbContext _context;

    public ColumnsController(ApplicationDbContext context) {
        _context = context;
    }
    
    [Route("api/projects/{projectId}/columns")]
    [HttpGet]
    public async Task<IActionResult> GetAllAsync(int projectId) {
        //checks if 
        if (_context.Projects.Find(projectId) == null) {
            return NotFound($"No projects found with Id: {projectId}");
        }
        
        var columns = await _context.Columns
            .Where(c => c.ProjectId == projectId)
            .OrderBy(c => c.Order)
            .ToListAsync();
        
        return Ok(columns);
    }
    
    [Route("api/projects/{projectId}/columns")]
    [HttpPost]
    public async Task<IActionResult> CreateAsync(int projectId, ColumnDto dto) {

        if (_context.Projects.Find(projectId) == null) {
            return NotFound($"No projects found with Id: {projectId}");
        }

        var column = new Column {
            Title = dto.Title,
            ProjectId = projectId,
            Order = dto.Order ?? 0
        };
        
        await _context.Columns.AddAsync(column);
        _context.SaveChanges();
        
        return Ok(column);
    }
    
    [Route("api/projects/{projectId}/columns/{id}")]
    [HttpPut]
    public async Task<IActionResult> UpdateAsync(int projectId,int id, ColumnDto dto) {

        if (_context.Projects.Find(projectId) == null) {
            return NotFound($"No projects found with Id: {projectId}");
        }

        var column = await _context.Columns.SingleOrDefaultAsync(c => c.Id == id);
        
        if(column == null) return NotFound($"No Columns found with Id: {id}");
        
        column.Title = dto.Title;
        column.Order = dto.Order ?? column.Order;
        _context.SaveChanges();
        
        return Ok(column);
    }
    
    [Route("api/projects/{projectId}/columns/{id}")]
    [HttpDelete]
    public async Task<IActionResult> DeleteAsync(int projectId,int id) {

        if (_context.Projects.Find(projectId) == null) {
            return NotFound($"No projects found with Id: {projectId}");
        }

        var column = await _context.Columns.SingleOrDefaultAsync(c => c.Id == id);
        
        if(column == null) return NotFound($"No Columns found with Id: {id}");

        _context.Remove(column);
        _context.SaveChanges();
        
        return Ok(column);
    }
}