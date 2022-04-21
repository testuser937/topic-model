using System.Threading.Tasks;
using Tm.Contracts;
using Tm.Domain;

namespace Tm.Interfaces
{
    public interface IMonitoringRepository
    {
        public Task<PageModel<MonitoringResult>> GetAll();

        public Task<MonitoringResult> GetSingle(long id);

        public Task<int> Create(MonitoringResult result);

        public Task Edit(MonitoringResult result);
    }
}