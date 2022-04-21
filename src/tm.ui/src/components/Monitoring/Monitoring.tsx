import React, {Component} from "react";
import {Button, Container, Form, Spinner} from "react-bootstrap";
import MonitoringTable from "./MonitoringTable";
import {MonitoringController} from "../../controllers/MonitoringController";

class Monitoring extends Component<any, any> {

    controller: MonitoringController = new MonitoringController();
    state = {
        topic: '', fetchInProcess: false, results:[]
    }

    componentDidMount() {
        this.controller.getAllResults()
            .then(response => {
                const results = response.data.Items;
                this.setState({results});
            })
            .catch(e=>console.log(e));
    }

    handleSubmit = (event: any) => {

        if (this.state.topic === "") {
            alert("Сначала введите текст!");
            event.preventDefault();
            return;
        }

        if (this.state.topic.length > 50){
            alert("Количество символов не должно превышать 50");
            event.preventDefault();
            return;
        }

        event.preventDefault();
    }
    handleChange = (event: any) => {
        this.setState({topic: event.target.value});
    }

    render() {

        const {topic, results} = this.state;
        return (<Container>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type={'text'}
                                      onChange={this.handleChange}
                                      placeholder="Введите тему для отслеживания"
                                      value={topic}
                        />
                    </Form.Group>
                    <Button variant="primary" type={'submit'} disabled={this.state.fetchInProcess}>
                        {this.state.fetchInProcess ? <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        /> : null}
                        <span className="visually-hidden">Loading...</span>
                        Начать мониторинг
                    </Button>
                </Form>
                <MonitoringTable results={results}/>
            </Container>

        );
    }
}

export default Monitoring;