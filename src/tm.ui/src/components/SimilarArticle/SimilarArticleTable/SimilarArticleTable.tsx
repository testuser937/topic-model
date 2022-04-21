import React, {Component} from "react";
import {Table} from "react-bootstrap";
import SimilarArticleTableRow from "./SimilarArticleTableRow";
import {SimilarArticleModel} from "../../../models/SimilarArticleModel";

class SimilarArticleTable extends Component<SimilarArticleTableProps, any> {

    render() {
        const rows: SimilarArticleTableRow[] = []
        const result: SimilarArticleModel[] = this.props.articles;

        result.forEach((article: SimilarArticleModel) => {
            // @ts-ignore
            rows.push(<SimilarArticleTableRow id={article.Id} title={article.Title} text={article.Text.slice(0, 70)+'...'} key={article.Id}/>)
        });
        return (this.props.articles.length > 0 &&
            <Table className={"Table"} responsive striped bordered>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Название</th>
                    <th>Текст</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        )
    }
}

type SimilarArticleTableProps = {
    articles: SimilarArticleModel[];
}

export default SimilarArticleTable;