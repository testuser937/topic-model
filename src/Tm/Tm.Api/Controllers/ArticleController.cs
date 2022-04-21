using System.ComponentModel;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Tm.Contracts;
using Tm.Domain;
using Tm.Interfaces;

namespace Tm.Api.Controllers
{
    [ApiController]
    [Route("api/article")]
    public class ArticleController : ControllerBase
    {
        [HttpPost("similar/currentPage/{currentPage:int}/pageLimit/{limit:int}")]
        public async Task<PageModel<Article>> GetSimilarArticles(
            TextModel text,
            [DefaultValue(1)]int currentPage,
            [DefaultValue(10)]int limit,
            [FromServices] IArticleRepository repository)
        {
            var articles = await repository.GetSimilarArticles(text, currentPage, limit);
            return articles;
        }

        [HttpGet("{id:int}")]
        public async Task<Article> GetArticle(long id, [FromServices] IArticleRepository repository)
        {
            var article = await repository.GetArticle(id);
            return article;
        }
    }
}