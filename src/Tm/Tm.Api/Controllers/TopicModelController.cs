using System.Diagnostics;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Tm.Contracts;
using Tm.Interfaces;

namespace Tm.Api.Controllers
{
    [ApiController]
    [Route("api/topic-model")]
    public class TopicModelController : ControllerBase
    {
        [HttpPost("analyze")]
        public async Task<TopicModel[]> GetTopics(TextModel text, [FromServices] ITopicAnalysisService topicAnalysisService)
        {
            var start = new Stopwatch();
            start.Start();
            var res = await topicAnalysisService.AnalyzeAsync(text);
            var end = start.Elapsed;
            return res;
        }
    }
}
