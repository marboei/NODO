using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;

namespace API.Models; 

public class User : IdentityUser {
    public string FirstName { get; set; }
    public string LastName { get; set; }
    [JsonIgnore]
    public virtual List<Project>? Projects { get; set; }
}