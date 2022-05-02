using API.Data;
using API.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers; 
using API.Data;
using API.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

    
[Authorize]
[ApiController]
public class LikesController : ControllerBase {
    private readonly ApplicationDbContext _context;
    private readonly UserManager<User> _userManager;

    public LikesController(ApplicationDbContext context, UserManager<User> userManager) {
        _context = context;
        _userManager = userManager;
    }
    
    [Route("api/projects/{projectId}/columns/{columnId}/cards/{cardId}/comments/{commentId}/likes")]
    [HttpPost]
    public async Task<IActionResult> AddLike(int projectId, int columnId, int cardId, int commentId, [FromBody]LikeDto dto) {
        var comment = await _context.Comments.FindAsync(commentId);
        if (comment is not null) {
            if (comment.Likes is null) {
                comment.Likes = new List<Like>();
            }

            var like = new Like() {
                UserId = dto.UserId
            };

            comment.Likes.Add(like);
            _context.SaveChanges();

            return Ok(comment);
        }
        else {
            return NotFound();
        }
    }
    
    [Route("api/projects/{projectId}/columns/{columnId}/cards/{cardId}/comments/{commentId}/likes/{userId}")]
    [HttpDelete]
    public async Task<IActionResult> DeleteComment(int projectId, int columnId, int cardId, int commentId, string userId) {
        if (_context.Comments != null) {
            var comment = await _context.Comments.FindAsync(commentId);
            if (comment != null) {
                comment.Likes = comment.Likes.Where(l => !((l.CommentId == commentId) && (Equals(l.UserId, userId)))).ToList();
                _context.SaveChanges();
                return Ok(comment);
            }
        }

        return NotFound();
    }
}
