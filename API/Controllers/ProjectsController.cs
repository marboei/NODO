using System.Linq;
using API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers; 

[Authorize]
[ApiController]
[Route("api/[controller]")]  //  api/projects
public class ProjectsController : ControllerBase {
    //for now we're going to access db from controllers, later on we'll implement it in Services
    private readonly ApplicationDbContext _context;
    private readonly UserManager<User> _userManager;

    public ProjectsController(ApplicationDbContext context, UserManager<User> userManager) {
        _context = context;
        _userManager = userManager;
    }

    [HttpGet("user/{userId}")]
    public async Task<IActionResult> GetAllAsync(string userId) {
        var projects = await _context.Users
            .Include(u => u.Projects)
            .Where(u=>u.Id == userId).Select(p => p.Projects)
            .ToListAsync();
        
        return Ok(projects[0]);
    }
    
    [HttpGet("{id}")]
    public async Task<IActionResult> GetByIdAsync(int id) {
        var projects = await _context.Projects.FindAsync(id);
        if (projects == null) {
            return NotFound($"No projects found with Id: {id}");
        }
        
        return Ok(projects);
    }

    [HttpPost("user/{userId}")]
    public async Task<IActionResult> Create([FromBody]Project project, [FromRoute]string userId) {
        var user = await _userManager.FindByIdAsync(userId);
        await _context.Projects.AddAsync(new Project {Title = project.Title, Users = new List<User>{user}});
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