using API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers; 

[ApiController]
[Route("api/[controller]")]  //  api/projects
public class ProjectsController : ControllerBase {
    //for now we're going to access db from controllers, later on we'll implement it in Services
    private readonly ApplicationDbContext _context;

    public ProjectsController(ApplicationDbContext context) {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllAsync() {
        var projects = await _context.Projects.ToListAsync();

        return Ok(projects);
    }
    
    [HttpGet("{id}")]
    public async Task<IActionResult> GetByIdAsync(int id) {
        var projects = await _context.Projects.FindAsync(id);
        if (projects == null) {
            return NotFound($"No projects found with Id: {id}");
        }
        
        return Ok(projects);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody]Project project) {
        await _context.Projects.AddAsync(project);
        _context.SaveChanges();
        return Ok(project);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update([FromBody] Project updatedProject, int id) {
        var project = await _context.Projects.SingleOrDefaultAsync(p => p.Id == id);
        if (project == null) {
            return NotFound($"No projects found with Id: {id}");
        }

        project.Title = updatedProject.Title;
        _context.SaveChanges();

        return Ok(project);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id) {
        var project = await _context.Projects.SingleOrDefaultAsync(p => p.Id == id);
        if (project == null) {
            return NotFound($"No projects found with Id: {id}");
        }
        _context.Projects.Remove(project);
        _context.SaveChanges();

        return Ok(project);
    }
    
}