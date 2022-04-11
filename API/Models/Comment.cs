

using System.Text.Json.Serialization;

namespace API.Models; 

public class Comment {
    public int Id { get; set; }
    public string Text { get; set; }
    public int Likes { get; set; } = 0;
    
 
    public virtual User User { get; set; } 

    public string UserId { get; set; }
    
    [JsonIgnore]
    public virtual Card Card { get; set; }
    [JsonIgnore]
    public int CardId { get; set; }
}