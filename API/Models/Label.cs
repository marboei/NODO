using System.Text.Json.Serialization;

namespace API.Models; 

public class Label {
    public int Id { get; set; }
    public string? Text { get; set; }
    public string? Color { get; set; }
    public int CardId { get; set; }
    
    [JsonIgnore]
    public virtual Card Card { get; set; }
}