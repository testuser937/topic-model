using System;
using System.Collections.Concurrent;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using AngleSharp;
using AngleSharp.Dom;
using Serilog.Core;
using Tm.Contracts;
using Tm.Interfaces;

namespace Tm.Scraper
{
    public class Scraper : IArticleScraper
    {
        private const string BaseUrlString = "https://cyberleninka.ru";
        private static readonly Random RandomGenerator = new();
        private readonly IArticleRepository _articleRepository;
        private readonly IBrowsingContext _browsingContext;
        private readonly ScraperConfiguration _scraperConfiguration;
        private readonly Uri _baseUri = new(BaseUrlString);
        private readonly Logger _logger;

        public Scraper(IArticleRepository articleRepository, ScraperConfiguration scraperConfiguration, Logger logger)
        {
            _articleRepository = articleRepository;
            _browsingContext = new BrowsingContext(Configuration.Default.WithDefaultLoader());
            _scraperConfiguration = scraperConfiguration;
            _logger = logger;
        }

        public async Task Start()
        {
            _logger.Information(JsonSerializer.Serialize(_scraperConfiguration, new JsonSerializerOptions { WriteIndented = true }));
            var downloadedCount = 0;
            var pageNumber = 10;
            var count = 0;
            var batch = new ConcurrentBag<ScrapedArticle>();

            while (true)
            {
                _logger.Information("Starting work with page: {pageNumber}", pageNumber);

                var startLink = CyberLeninkaLinks.GetStartLink(_scraperConfiguration.CurrentArticleType);
                var articlesLink = startLink + $"/{pageNumber}";

                var document = await _browsingContext.OpenAsync(articlesLink);
                var articleBlocks = document.QuerySelectorAll("ul.list li");
                if (articleBlocks.Length == 0)
                {
                    _logger.Information("Articles count on page {pageNumber} is {length}", pageNumber, articleBlocks.Length);
                    break;
                }

                foreach (var articleBlock in articleBlocks)
                {
                    var article = await GetArticleAsync(articleBlock);
                    if (article != null)
                    {
                        batch.Add(article);
                    }

                    var delayBetweenArticles = RandomGenerator.Next(3, 7);
                    await Task.Delay(TimeSpan.FromSeconds(delayBetweenArticles));
                }

                downloadedCount += articleBlocks.Length;
                count += articleBlocks.Length;
                _logger.Information("Downloaded count: {downloadedCount}", downloadedCount);
                _logger.Information("Page: {pageNumber} done", pageNumber);
                pageNumber++;

                if (count >= 20)
                {
                    await _articleRepository.Save(batch);
                    batch.Clear();
                    count = 0;
                }

                var delayBetweenPages = RandomGenerator.Next(2, 7);
                _logger.Information("Delay between pages: {delay}", delayBetweenPages);
                await Task.Delay(TimeSpan.FromSeconds(delayBetweenPages));
            }

            if (!batch.IsEmpty)
            {
                await _articleRepository.Save(batch);
            }
        }

        private async Task<ScrapedArticle> GetArticleAsync(IElement liElement)
        {
            var link = liElement.QuerySelector("a")?.GetAttribute("href");
            var title = liElement.QuerySelector("div.title").Text();

            var text = await ExtractOneArticle(link);
            if (string.IsNullOrEmpty(text))
            {
                return null;
            }

            var cleanedText = TextCleaner.CleanText(title, text);
            var article = new ScrapedArticle(title, cleanedText, _scraperConfiguration.CurrentArticleType);
            _logger.Information("Downloaded: {title}", title);

            return article;
        }

        private async Task<string> ExtractOneArticle(string link)
        {
            var uri = new Uri(_baseUri, link);
            var document = await _browsingContext.OpenAsync(uri.AbsoluteUri);
            var ps = document.All
                .FirstOrDefault(x => x.ClassName == "ocr" && x.GetAttribute("itemprop") == "articleBody");
            return ps != null
                ? ps.Text()
                : string.Empty;
        }
    }
}