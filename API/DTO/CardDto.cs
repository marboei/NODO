namespace API.DTO; 

public class CardDto {
    [MaxLength(100)]
    public string Title { get; set; }
    public int? ColumnId { get; set; }
}