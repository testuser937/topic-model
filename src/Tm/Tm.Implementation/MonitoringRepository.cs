using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Tm.Contracts;
using Tm.Domain;
using Tm.Interfaces;

namespace Tm.Implementation
{
    public class MonitoringRepository : IMonitoringRepository
    {
        private readonly DbContext _dbContext;

        public MonitoringRepository(DbContext dbContext)
        {
            _dbContext = dbContext;
        }

        /// <inheritdoc />
        public async Task<PageModel<MonitoringResult>> GetAll()
        {
            const string sql = @"
select
        id,
        status_id status,
        topic
    from tm.monitoring;";

            var results = await _dbContext.Connection.QueryAsync<MonitoringResult>(sql);
            var resultsArr = results.ToArray();
            return new PageModel<MonitoringResult>(resultsArr, resultsArr.Length);
        }

        /// <inheritdoc />
        public Task<MonitoringResult> GetSingle(long id)
        {
            const string sql = @"
select
        id,
        status_id status,
        topic
    from tm.monitoring
    where id = :id";

            return _dbContext.Connection.QuerySingleAsync<MonitoringResult>(sql);
        }

        /// <inheritdoc />
        public async Task<int> Create(MonitoringResult result)
        {
            const string sql = @"
insert into tm.monitoring
(
    status_id,
    topic
)
values
(
    :status,
    :topic
)
returning id;";

            var id = await _dbContext.Connection.ExecuteScalarAsync<int>(sql,
                new { status = MonitoringStatus.InProgress, topic = result.Topic });
            return id;
        }

        /// <inheritdoc />
        public Task Edit(MonitoringResult result)
        {
            const string sql = @"
update tm.monitoring
set
    status_id=:status,
    topic=:topic
where id=:id;
";
            return _dbContext.Connection.ExecuteAsync(sql,
                new { status = (int)result.Status, id = result.Id, topic = result.Topic });
        }
    }
}