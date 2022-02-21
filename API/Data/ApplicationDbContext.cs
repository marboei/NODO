
using Microsoft.EntityFrameworkCore;

namespace API.Data; 

public class ApplicationDbContext : DbContext {
    
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
    
    public DbSet<Project> Projects { get; set; }
    public DbSet<Column> Columns { get; set; }
    public DbSet<Card> Cards { get; set; }

}