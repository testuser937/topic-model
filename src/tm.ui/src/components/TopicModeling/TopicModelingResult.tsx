import React, {Component} from "react";
import {Card, CardGroup, Col, Row} from "react-bootstrap";
import TopicModelTable from "./TopicModelTable/TopicModelTable";
import TopicPieChart from "./TopicChart";
import CardHeader from "react-bootstrap/CardHeader";
import './TopicModeling.css'

class TopicModelingResult extends Component<any, any> {

    render() {
        return (this.props.topics.length > 0 &&
            <div className={"TopicModelingResult"}>
                <CardGroup>
                    <Card>
                        <CardHeader>
                            Описание тем
                        </CardHeader>
                        <Card.Body>
                            <TopicModelTable topics={this.props.topics}/>
                        </Card.Body>
                    </Card>
                    <Card>
                        <CardHeader>
                            Распределение тем
                        </CardHeader>
                        <Card.Body>
                            <TopicPieChart topics={this.props.topics}/>
                        </Card.Body>
                    </Card>
                </CardGroup>
            </div>
        );
    }
}

export default TopicModelingResult;