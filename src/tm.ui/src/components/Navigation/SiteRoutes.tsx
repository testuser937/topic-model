import React, {Component} from "react";
import {Route, Routes} from "react-router-dom";
import TopicModeling from "../TopicModeling/TopicModeling";
import TestComponent from "../TestComponent";
import Monitoring from "../Monitoring/Monitoring";
import NotFound from "../NotFound";
import SimilarArticlePage from "../SimilarArticle/SimilarArticlePage";
import Article from "../Article/Article";
import MonitoringResultPage from "../Monitoring/MonitoringResultPage";

class SiteRoutes extends Component<any, any> {

    render() {
        return (
            <Routes>
                <Route path={'/'} element={<TopicModeling/>}/>
                <Route path={'/test'} element={<TestComponent/>}/>
                <Route path={'/monitoring'} element={<Monitoring/>}/>
                <Route path={'/search'} element={<SimilarArticlePage/>}/>
                <Route path={'/article/:id'} element={<Article/>}/>
                <Route path={'/monitoringResult/:id'} element={<MonitoringResultPage/>}/>
                <Route path={'*'} element={<NotFound/>}/>
            </Routes>);
    }
}

export default SiteRoutes;