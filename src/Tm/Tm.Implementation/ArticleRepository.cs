using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Tm.Contracts;
using Tm.Domain;
using Tm.Interfaces;

namespace Tm.Implementation
{
    public class ArticleRepository : IArticleRepository
    {
        private readonly DbContext _dbContext;

        public ArticleRepository(DbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Task Save(ScrapedArticle a)
        {
            const string insertStatement = @"
INSERT INTO public.article
    (""text"", title, article_type_id)
VALUES(:text, :title, :articleTypeId);";

            return _dbContext.Connection.ExecuteAsync(insertStatement, a);
        }

        public async Task Save(IEnumerable<ScrapedArticle> articles)
        {
            await using var writer = await _dbContext.Connection.BeginBinaryImportAsync(
                "copy public.article(text, title, article_type_id) from STDIN (FORMAT BINARY)");
            foreach (var a in articles)
            {
                await writer.StartRowAsync();
                await writer.WriteAsync(a.Text);
                await writer.WriteAsync(a.Title);
                await writer.WriteAsync((int)a.ArticleTypeId);
            }

            await writer.CompleteAsync();
        }

        /// <inheritdoc />
        public Task<Article> GetArticle(long id)
        {
            const string articleSql = @"
select
        id,
        title,
        text
    from tm.article
    where id = :id
";

            return _dbContext.Connection.QuerySingleAsync<Article>(articleSql, new {id});
        }

        /// <inheritdoc />
        public async Task<PageModel<Article>> GetSimilarArticles(TextModel topic, int currentPage, int limit)
        {
            //var offset = (currentPage - 1) * limit;
            var offset = currentPage * limit;

            string text = "%" + topic.Text + "%";

            const string similarSql = @"
select 
        count(*)
    from tm_result
    where topic like :text;

select
        a.id,
        a.title,
        left(a.Text, 50) as ""Text""
    from tm.tm_result r
    left join tm.article a on r.article_id = a.id
    where r.topic like :text
    limit :limit offset :offset;
";

            var multi = await _dbContext.Connection.QueryMultipleAsync(similarSql, new { limit, offset, text });
            var totalRowCount = multi.Read<int>().Single();
            var gridDataRows = multi.Read<Article>().ToList();
            return new PageModel<Article>(gridDataRows, totalRowCount);
        }

        /// <inheritdoc />
        public async Task<List<Article>> GetAllSimilarArticles(TextModel topic)
        {
            string text = "%" + topic.Text + "%";
            const string similarSql = @"
select
        a.id,
        a.title,
        left(a.Text, 50) as ""Text""
    from tm.tm_result r
    left join tm.article a on r.article_id = a.id
    where r.topic like :text
";
            var allArticles = await _dbContext.Connection.QueryAsync<Article>(similarSql, new { text });
            return allArticles.ToList();
        }
    }
}