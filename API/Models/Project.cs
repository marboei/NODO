
namespace API.Models; 

public class Project {
    
    public int Id { get; set; }
    
    [MaxLength(100)]
    public string Title { get; set; }
    
    //Navigation Property
    public List<Column>? Columns { get; set; }
}