using System;

namespace Tm.Scraper
{
    public class TextCleaner
    {
        public static string CleanText(string title, string text)
        {
            text = text.Trim();

            var lines = text.Split(
                "\n",
                StringSplitOptions.TrimEntries | StringSplitOptions.RemoveEmptyEntries);

            text = string.Join(" ", lines);

            var start = text.IndexOf(title, StringComparison.OrdinalIgnoreCase);
            if (start > 0)
            {
                text = text[start..];
            }

            return text;
        }
    }
}