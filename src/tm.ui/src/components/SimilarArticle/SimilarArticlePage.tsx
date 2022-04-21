import React, {Component} from "react";
import {TopicModelController} from "../../controllers/TopicModelController";
import {TextModel} from "../../models/TextModel";
import SimilarArticleTable from "./SimilarArticleTable/SimilarArticleTable";
import Form from "react-bootstrap/esm/Form";
import {Button, Container, Spinner} from "react-bootstrap";
import {SimilarArticleModel} from "../../models/SimilarArticleModel";
import ReactPaginate from "react-paginate";
import './SimilarArticlePage.css'

class SimilarArticlePage extends Component<any, SimilarArticlePageState> {
    state = {
        topic: '',
        currentArticles: [],
        currentPage: 1,
        pageLimit: 10,
        totalPages: 0,
        fetchInProcess: false
    }
    controller: TopicModelController = new TopicModelController();

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }

    fetchData(topic: string, pageLimit: number, currentPage: number): void {
        if (topic == null || topic === '') {
            return;
        }
        this.setState({fetchInProcess: true});
        this.controller.getSimilarArticlesWithPagination(new TextModel(this.state.topic), currentPage, pageLimit)
            .then(response => {
                const currentArticles = response.data.Items;
                const totalPages = Math.ceil(response.data.TotalCount / this.state.pageLimit);
                this.setState({currentArticles, fetchInProcess: false, totalPages});
            })
            .catch(e => {
                console.log(e);
                this.setState({fetchInProcess: false});
            });//allCountries.slice(offset, offset + pageLimit);
    }

    handleSubmit(event: any) {
        if (this.state.fetchInProcess) {
            return;
        }

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

        this.setState({currentArticles: []})
        this.fetchData(this.state.topic, this.state.pageLimit, this.state.currentPage);
        event.preventDefault();
    }

    handleChange(event: any) {
        this.setState({topic: event.target.value});
    }

    handlePageClick = (event) => {
        let page = event.selected;
        this.setState({currentPage: page})
        this.fetchData(this.state.topic, this.state.pageLimit, page);
    }

    render() {
        const {topic, currentArticles, totalPages} = this.state;

        const pagination = <ReactPaginate
            previousLabel={'<'}
            nextLabel={'>'}
            pageCount={totalPages}
            onPageChange={this.handlePageClick}
            containerClassName={'pagination'}
            activeClassName={'active'}
        />;

        return (
            <Container>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type={'text'} onChange={this.handleChange} placeholder="Введите тему для поиска"
                                      value={topic}/>
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
                        Поиск
                    </Button>
                </Form>
                <SimilarArticleTable articles={currentArticles}/>
                {this.state.currentArticles.length == 0 ? null : pagination}
            </Container>
        );
    }
}


interface SimilarArticlePageState {
    topic: string;
    currentPage: number;
    pageLimit: number;
    currentArticles: SimilarArticleModel[];
    totalPages: number;
    fetchInProcess: boolean;
}

export default SimilarArticlePage;