namespace API.DTO; 

public class ColumnDto {
    [MaxLength(100)]
    public string Title { get; set; }
    public int? Order { get; set; }
}