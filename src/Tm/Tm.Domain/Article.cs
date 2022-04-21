namespace Tm.Domain
{
    public class Article
    {
        public long Id { get; }

        public string Title { get; }

        public string Text { get; }

        public Article(long id, string title, string text)
        {
            Id = id;
            Title = title;
            Text = text;
        }

        private Article()
        {
        }
    }
}