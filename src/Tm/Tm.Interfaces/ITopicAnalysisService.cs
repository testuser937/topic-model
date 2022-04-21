using System.Threading.Tasks;
using Tm.Contracts;

namespace Tm.Interfaces
{
    public interface ITopicAnalysisService
    {
        public Task<TopicModel[]> AnalyzeAsync(TextModel text);
    }
}