import React, {Component} from "react";
import {Table} from "react-bootstrap";
import {MonitoringResultModel} from "../../models/MonitoringResultModel";
import MonitoringTableRow from "./MonitoringTableRow";
import './MonitoringTable.css'

class MonitoringTable extends Component<MonitoringTableProps, any> {


    render() {
        const rows: MonitoringTableRow[] = []
        const result: MonitoringResultModel[] = this.props.results;

        result.forEach((article: MonitoringResultModel) => {
            // @ts-ignore
            rows.push(<MonitoringTableRow id={article.Id} status={article.Status} topic={article.Topic}
                                          key={article.Id}/>)
        });
        return (this.props.results.length > 0 &&
            <Table className={"Table"} responsive striped bordered>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Статус</th>
                    <th>Тема</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>)
    }
}

type MonitoringTableProps = {
    results: MonitoringResultModel[];
}

export default MonitoringTable;