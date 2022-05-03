namespace API.DTO; 

public class GetCommentDto {
    public int? Id { get; set; }
    public string? Text { get; set; }
    public User? User { get; set; }
    
    public int? Likes { get; set; }
}