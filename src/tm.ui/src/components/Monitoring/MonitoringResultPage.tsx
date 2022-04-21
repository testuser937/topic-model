import React, {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";
import {MonitoringController} from "../../controllers/MonitoringController";
import {PageModel} from "../../models/PageModel";
import {ArticleModel} from "../../models/ArticleModel";
import SimilarArticleTable from "../SimilarArticle/SimilarArticleTable/SimilarArticleTable";


const MonitoringResultPage = () => {
    const navigate = useNavigate();
    const [monitoringResults, setMonitoringResults] = useState<PageModel<ArticleModel>>(new PageModel<ArticleModel>([], 0, 0));
    let {id} = useParams();
    let location = useLocation();
    let controller: MonitoringController = new MonitoringController();

    useEffect(() => {


        // @ts-ignore
        controller.getSingle(id)
            .then(r => {
                setMonitoringResults(r.data)
            })
            .catch(e => console.log(e));
    }, []);

    const topic = location?.state?.topic;
    return (
        <Container>
            <Row>
                <Col><span>Список статей, найденных в процессе мониторинга для темы: <b>{topic != null ? topic : ""}</b></span></Col>
            </Row>
           <SimilarArticleTable articles={monitoringResults.Items}/>
        </Container>
)
}

export default MonitoringResultPage;