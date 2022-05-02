
namespace API.Models; 

using System.Text.Json.Serialization;

public class Column {
    
    public int Id { get; set; }
    [MaxLength(100)]
    public string Title { get; set; }

    public int ProjectId { get; set; }
    [JsonIgnore]
    public virtual Project Project { get; set; }

    public int? Order { get; set; } = 0;
    
    public virtual List<Card>? Cards { get; set; }
}