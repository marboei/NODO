namespace API.DTO; 

public class CardDto {
    [MaxLength(100)]
    public string? Title { get; set; }
    public int? ColumnId { get; set; }
    public bool? Completed { get; set; }
    
    public List<string>? AssignedTo { get; set; }
    
    public string? Description { get; set; }
    
    public List<Label>? Labels { get; set; }
    
    public DateTime? DueDate { get; set; }
    
    public List<Comment>? Comments { get; set; }
    
    public string? UserId { get; set; }
    public int? Order { get; set; }
}