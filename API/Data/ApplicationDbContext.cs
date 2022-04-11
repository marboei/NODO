
using System.Reflection.Emit;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data; 

public class ApplicationDbContext : IdentityDbContext<User> {
    
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
    
    public DbSet<Project> Projects { get; set; }
    public DbSet<Column> Columns { get; set; }
    public DbSet<Card> Cards { get; set; }
    
    public DbSet<Comment>? Comments { get; set; }

    protected override void OnModelCreating(ModelBuilder builder) {
        base.OnModelCreating(builder);
        builder.Entity<IdentityRole>()
            .HasData(
                new IdentityRole() {Name = "Member", NormalizedName = "MEMBER"},
                new IdentityRole() {Name = "Admin", NormalizedName = "ADMIN"}
            );
        builder.Entity<Comment>()
            .HasOne(b => b.Card)
            .WithMany(a => a.Comments)
            .OnDelete(DeleteBehavior.Cascade);


    }

}