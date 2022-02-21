
using Microsoft.EntityFrameworkCore;

namespace API.Data; 

public class ApplicationDbContext : DbContext {
    
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
    
    DbSet<Project> Projects { get; set; }
    DbSet<Column> Columns { get; set; }
    DbSet<Card> Tasks { get; set; }

}