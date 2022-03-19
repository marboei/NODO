using Microsoft.AspNetCore.Identity;

namespace API.Models; 

public class User : IdentityUser {
    public string FirstName { get; set; }
    public string LastName { get; set; }
    
    public virtual List<Project>? Projects { get; set; }
}