export class SimilarArticleModel {
    Id: number;
    Title: string;
    Text: string;

    constructor(id: number, title: string, text: string) {
        this.Id = id;
        this.Title = title;
        this.Text = text;
    }
}