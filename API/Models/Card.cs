namespace API.Models; 

public class Card {
    
    public int Id { get; set; }
    [MaxLength(100)]
    public string Title { get; set; }

    public int ColumnId { get; set; }
    
}