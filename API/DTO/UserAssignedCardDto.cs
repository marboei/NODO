namespace API.DTO; 

public class UserAssignedCardDto {
    public int CardId { get; set; }
    public int ColumnId { get; set; }
    public int ProjectId { get; set; }
    public string UserId { get; set; }
    public string Title { get; set; }
    public string ProjectTitle { get; set; }
    public string ColumnTitle { get; set; }
}