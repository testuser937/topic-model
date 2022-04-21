import React, {Component, FC, ReactElement, useEffect, useState} from "react";
import {TopicModelController} from "../../controllers/TopicModelController";
import {useParams} from "react-router-dom";
import {ArticleModel} from "../../models/ArticleModel";
import userEvent from "@testing-library/user-event";
import {Button, Card, Col, Container, Row, Spinner} from "react-bootstrap";
import './Article.css'
import { useNavigate } from 'react-router-dom';



const Article = () => {
    const navigate = useNavigate();
    const [article, setArticle] = useState<ArticleModel>(new ArticleModel(0, '', ''));
    let {id} = useParams();
    let controller: TopicModelController = new TopicModelController();

    useEffect(() => {

        // @ts-ignore
        controller.getSingleArticle(id)
            .then(r => {
                setArticle(r.data)
            })
            .catch(e => console.log(e));
    }, []);

    return (
        <Container>
            <Button onClick={() => navigate('/search')} variant="primary">Назад</Button>
            <Row>
                <Col>
                    <h4>{article.Title}</h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className={"ArticleText"}>
                        {article.Text}
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Article;