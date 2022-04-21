using System.Collections.Generic;
using System.Threading.Tasks;
using Tm.Contracts;
using Tm.Domain;

namespace Tm.Interfaces
{
    public interface IArticleRepository
    {
        public Task Save(ScrapedArticle a);

        public Task Save(IEnumerable<ScrapedArticle> articles);

        public Task<Article> GetArticle(long id);

        public Task<PageModel<Article>> GetSimilarArticles(TextModel topic, int currentPage, int limit);

        public Task<List<Article>> GetAllSimilarArticles(TextModel topic);
    }
}