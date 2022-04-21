import React from "react";
import {Row, Table} from "react-bootstrap";
import {TopicModel} from "../../../models/TopicModel";
import TopicRow from "../TopicRow";
import './TopicModelTable.css'

class TopicModelTable extends React.Component <any, any> {


    render() {
        const rows: TopicRow[] = []
        const result: TopicModel[] = this.props.topics;
        const sorted = result.sort((a,b)=>{return b.Probability - a.Probability});
        sorted.forEach((topic:TopicModel)=>
        {
            // @ts-ignore
            rows.push(<TopicRow topicId={topic.TopicId} probability={topic.Probability} keyWords={topic.KeyWords} key={topic.TopicId}/>)
        });
        return ( this.props.topics.length > 0 &&

                <Table responsive striped bordered>
                    <thead>
                    <tr>
                        <th>№ темы</th>
                        <th>Вероятность</th>
                        <th>Ключевые слова</th>
                    </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>

        )
    }
}
export default TopicModelTable;

