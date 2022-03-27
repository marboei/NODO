
using System.Text.Json.Serialization;

namespace API.Models; 

public class Project {
    
    public int Id { get; set; }
    
    [MaxLength(100)]
    public string Title { get; set; }
    
    //Navigation Property
    public virtual List<Column>? Columns { get; set; }
    
    public virtual List<User>? Users { get; set; }
}