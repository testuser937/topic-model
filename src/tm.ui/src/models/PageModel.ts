export class PageModel<T>{
    Items: T[];
    Count: number;
    TotalCount: number;

    constructor(items: T[], count: number, totalCount: number) {
        this.Count = count;
        this.Items = items;
        this.TotalCount = totalCount;
    }
}



