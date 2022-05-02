using System.Text.Json.Serialization;

namespace API.Models; 

public class Card {
    
    public int Id { get; set; }
    [MaxLength(100)]
    public string Title { get; set; }

    public bool Completed { get; set; } = false;

    public int ColumnId { get; set; }
    
    [JsonIgnore]
    public virtual Column Column { get; set; }
    
    public virtual List<User>? AssignedTo { get; set; }
    
    public string? Description { get; set; }
    
    public virtual List<Label>? Labels { get; set; }
    
    public DateTime? DueDate { get; set; }
    [JsonIgnore]
    public virtual List<Comment>? Comments { get; set; }
    
    public int Order { get; set; }
    
    
    
}