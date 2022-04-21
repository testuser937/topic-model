using System.Threading.Tasks;
using Tm.Contracts;
using Tm.Domain;

namespace Tm.Implementation
{
    public interface IMonitoringResultRepository
    {
        public Task<PageModel<Article>> GetMonitoringResult(long id);
    }
}