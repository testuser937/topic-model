using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Tm.Contracts;
using Tm.Domain;
using Tm.Implementation;
using Tm.Interfaces;

namespace Tm.Api.Controllers
{
    [ApiController]
    [Route("api/monitoring")]
    public class MonitoringController : ControllerBase
    {
        [HttpPost("start")]
        public Task<long> StartMonitoring(TextModel text)
        {
            return Task.FromResult(1L);
        }

        [HttpPost("stop")]
        public Task<int> StopMonitoring(long id)
        {
            return Task.FromResult(1);
        }

        [HttpGet("single/{id:long}")]
        public async Task<PageModel<Article>> GetSingleResult(long id, [FromServices] IMonitoringResultRepository monitoringResultRepository)
        {
            var result = await monitoringResultRepository.GetMonitoringResult(id);
            return result;
        }

        [HttpGet("all")]
        public async Task<PageModel<MonitoringResult>> GetAllResult([FromServices] IMonitoringRepository repository)
        {
            return await repository.GetAll();
        }
    }
}