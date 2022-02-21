
namespace API.Models; 

public class Column {
    
    public int Id { get; set; }
    [MaxLength(100)]
    public string Title { get; set; }

    public int ProjectId { get; set; }
    public Project Project { get; set; }

    public List<Card>? Cards { get; set; }
}