using System.Net.Http;
using System.Text;
using System.Text.Encodings.Web;
using System.Text.Json;
using System.Text.Unicode;
using System.Threading.Tasks;
using Tm.Contracts;
using Tm.Interfaces;

namespace Tm.Implementation
{
    public class TopicAnalysisService : ITopicAnalysisService
    {
        private readonly HttpClient _httpClient;

        public TopicAnalysisService(HttpClient client)
        {
            _httpClient = client;
        }

        public async Task<TopicModel[]> AnalyzeAsync(TextModel text)
        {
            var jso = new JsonSerializerOptions
            {
                Encoder = JavaScriptEncoder.Create(UnicodeRanges.BasicLatin, UnicodeRanges.Cyrillic),
                WriteIndented = true,
                PropertyNamingPolicy = null,
            };

            var textJson = JsonSerializer.Serialize(text, jso);
            var content = new StringContent(textJson, Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync("http://localhost:5000/api/analyze", content);
            var responseJson = await response.Content.ReadAsStringAsync();

            var topics = JsonSerializer.Deserialize<TopicModel[]>(responseJson, jso);

            return topics;
        }
    }
}