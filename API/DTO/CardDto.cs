namespace API.DTO; 

public class CardDto {
    [MaxLength(100)]
    public string? Title { get; set; }
    public int? ColumnId { get; set; }
    
    public List<string>? AssignedTo { get; set; }
    
    public string? Description { get; set; }
    
    public string? Label { get; set; }
    
    public DateTime? DueDate { get; set; }
    
    public List<Comment>? Comments { get; set; }
    
    public string? UserId { get; set; }
}