using System;
using Tm.Contracts;

namespace Tm.Scraper
{
    public class CyberLeninkaLinks
    {
        public static string GetStartLink(ArticleType articleType)
        {
            return articleType switch
            {
                ArticleType.ComputerScience => "https://cyberleninka.ru/article/c/computer-and-information-sciences",
                ArticleType.BasicMedicine => "https://cyberleninka.ru/article/c/basic-medicine",
                ArticleType.HistoryAndArcheology => "https://cyberleninka.ru/article/c/history-and-archaeology",
                ArticleType.VeterinaryScience => "https://cyberleninka.ru/article/c/veterinary-science",
                ArticleType.CivilEngineering => "https://cyberleninka.ru/article/c/civil-engineering",
                ArticleType.SmiAndCommunications => "https://cyberleninka.ru/article/c/media-and-communications",
                _ => throw new ArgumentOutOfRangeException(nameof(articleType), articleType, null)
            };
        }
    }
}