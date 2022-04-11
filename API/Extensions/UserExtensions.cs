namespace API.Extensions; 

public static class UserExtensions {
    public static IQueryable<User> Search(this IQueryable<User> query, string searchTerm) {
        if (string.IsNullOrEmpty(searchTerm))
            return query;
        
        var lowerCaseSearchTerm = searchTerm.Trim().ToLower();

        return query.Where(u => u.UserName.ToLower().Contains(lowerCaseSearchTerm));
    }
}