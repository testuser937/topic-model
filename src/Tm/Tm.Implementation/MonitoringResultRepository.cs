using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Tm.Contracts;
using Tm.Domain;

namespace Tm.Implementation
{
    public class MonitoringResultRepository : IMonitoringResultRepository
    {
        private readonly DbContext _dbContext;

        public MonitoringResultRepository(DbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<PageModel<Article>> GetMonitoringResult(long id)
        {
            const string sql = @"
select
        a.id,
        a.title,
        a.""text""
    from tm.monitoring_result mr
    left join tm.monitoring m on mr.monitoring_id = m.id
    left join tm.article a on a.id = mr.article_id
    where m.id = :id
";
            var results = await _dbContext.Connection.QueryAsync<Article>(sql, new { id });
            var data = results.ToArray();
            return new PageModel<Article>(data, data.Length);
        }
    }
}