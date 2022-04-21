using System.Collections.Generic;
using System.Linq;

namespace Tm.Contracts
{
    public class PageModel<T>
    {
        public List<T> Items { get; }

        public long Count { get; }

        public long TotalCount { get; }

        public PageModel(IEnumerable<T> items, long totalCount)
        {
            Items = items.ToList();
            Count = Items.Count;
            TotalCount = totalCount;
        }
    }
}