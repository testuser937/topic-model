import React from 'react';
import {TopicModelController} from "../../controllers/TopicModelController";
import {TextModel} from "../../models/TextModel";
import {TopicModel} from "../../models/TopicModel";
import {AxiosResponse} from "axios";
import {Form, Container, Col, Row, Spinner, Button} from "react-bootstrap";
import TopicModelingResult from "./TopicModelingResult";

class TopicModeling extends React.Component <any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            value: '',
            topics: [],
            fetchInProcess: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.gotTopics = this.gotTopics.bind(this);
    }

    handleChange(event: any) {
        this.setState({value: event.target.value});
    }

    gotTopics(value: AxiosResponse<Array<TopicModel>>) {
        this.setState({topics: value.data, fetchInProcess: false});
    }

    handleSubmit(event: any) {
        if (this.state.fetchInProcess){
            return;
        }

        let text = this.state.value;
        if (text === "") {
            alert("Сначала введите текст!");
            event.preventDefault();
            return;
        }

        if (text.length > 100000){
            alert("Количество символов не должно превышать 100000");
            event.preventDefault();
            return;
        }

        let model: TextModel = new TextModel(text);
        this.setState({fetchInProcess: true});

        this.controller
            .analyzeTopics(model)
            .then(this.gotTopics)
            .catch((e) => {
                console.log(e);
                this.setState({fetchInProcess: false})
            });

        event.preventDefault();
    }

    controller = new TopicModelController()

    render() {
        return (
            <Container fluid={"md"}>
                <Row>
                    <Col>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Анализ тематики научной статьи</Form.Label>
                                <Form.Control as="textarea" placeholder={"Введите текст для анализа"} rows={10}
                                              onChange={this.handleChange}/>
                            </Form.Group>
                            <Button variant="primary" type={'submit'} disabled={this.state.fetchInProcess}>
                                {this.state.fetchInProcess ?
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                    : null
                                }
                                <span className="visually-hidden">Loading...</span>
                                Анализ
                            </Button>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <TopicModelingResult topics={this.state.topics}/>
                </Row>

            </Container>
        );
    }
}

export default TopicModeling;