import {Component} from "react";
import MonitoringResultTableRow from "./MonitoringResultTableRow";
import Article from "../Article/Article";
import {ArticleModel} from "../../models/ArticleModel";
import {Table} from "react-bootstrap";

class MonitoringResultTable extends Component<MonitoringResultTableProps, any> {

    render() {
        const rows: MonitoringResultTableRow[] = []
        const result: ArticleModel[] = this.props.articles;

        result.forEach((article: ArticleModel) => {
            // @ts-ignore
            rows.push(<MonitoringResultTableRow id={article.Id} title={article.Title} text={article.Text.slice(0, 70)+'...'} key={article.Id}/>)
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

type MonitoringResultTableProps = {
    articles: ArticleModel[];
}

export default MonitoringResultTable;