using Tm.Contracts;

namespace Tm.Scraper
{
    public class ScraperConfiguration
    {
        public ArticleType CurrentArticleType { get; set; } = ArticleType.SmiAndCommunications;
    }

    /*
     * 1. Computer Science https://cyberleninka.ru/article/c/computer-and-information-sciences
     * 2. Medicine https://cyberleninka.ru/article/c/basic-medicine
     * 3. History and archeology https://cyberleninka.ru/article/c/history-and-archaeology
     * 4. Veterinary Science https://cyberleninka.ru/article/c/veterinary-science
     * 5. Civil Engineering https://cyberleninka.ru/article/c/civil-engineering
     * 6. SMI and Communications https://cyberleninka.ru/article/c/media-and-communications
     *
     */
}