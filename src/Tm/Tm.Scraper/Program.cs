using System.Threading.Tasks;
using Autofac;
using Serilog;
using Tm.Implementation;
using Tm.Interfaces;

namespace Tm.Scraper
{
    class Program
    {
        public Program()
        {
        }

        public static async Task Main()
        {
            var container = BuildDi();
            await using var scope = container.BeginLifetimeScope();

            var scraper = scope.Resolve<IArticleScraper>();
            await scraper.Start();
        }

        private static IContainer BuildDi()
        {
            var connectionString = "Server=localhost;Port=5432;Database=topic_model;User Id=postgres;Password=1234;Search Path=article;CommandTimeout=60000;Timezone=+05";
            var scraperConfig = new ScraperConfiguration();

            using var log = new LoggerConfiguration()
                .WriteTo.Console()
                .WriteTo.File("log.txt", rollingInterval: RollingInterval.Day)
                .CreateLogger();

            var builder = new ContainerBuilder();

            builder.RegisterInstance(log).SingleInstance();
            builder.RegisterInstance(new DbContext(connectionString)).SingleInstance();
            builder.RegisterInstance(scraperConfig).SingleInstance();
            builder.RegisterType<ArticleRepository>().As<IArticleRepository>();
            builder.RegisterType<Scraper>().As<IArticleScraper>();

            return builder.Build();
        }
    }
}
