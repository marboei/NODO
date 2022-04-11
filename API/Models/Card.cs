using Newtonsoft.Json;

namespace API.Models; 

public class Card {
    
    public int Id { get; set; }
    [MaxLength(100)]
    public string Title { get; set; }

    public int ColumnId { get; set; }
    
    public virtual List<User>? AssignedTo { get; set; }
    
    public string? Description { get; set; }
    
    public string? Label { get; set; }
    
    public DateTime? DueDate { get; set; }
    [JsonIgnore]
    public virtual List<Comment>? Comments { get; set; }
    
    
    
}