namespace Tm.Contracts
{
    public class ScrapedArticle
    {
        public string Title { get; set; }

        public string Text { get; set; }

        public ArticleType ArticleTypeId { get; set; }

        public ScrapedArticle(string title, string text, ArticleType articleTypeId)
        {
            Title = title;
            Text = text;
            ArticleTypeId = articleTypeId;
        }
    }
}