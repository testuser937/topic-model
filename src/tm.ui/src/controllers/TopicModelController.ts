import Axios, { AxiosPromise } from 'axios';
import {TopicModel} from "../models/TopicModel";
import {TextModel} from "../models/TextModel";
import {SiteUrl} from "../components/Settings/Site_Url";
import {SimilarArticleModel} from "../models/SimilarArticleModel";
import {PageModel} from "../models/PageModel";
import {ArticleModel} from "../models/ArticleModel";

export class TopicModelController{
    public analyzeTopics(text: TextModel): AxiosPromise<Array<TopicModel>>{
        return Axios.post(SiteUrl.TopicModel_Analyze(), text);
    }

    public getSimilarArticlesWithPagination(text: TextModel, currentPage: number, pageLimit: number): AxiosPromise<PageModel<SimilarArticleModel>>{
        return Axios.post(SiteUrl.Article_Similar()+`/currentPage/${currentPage}/pageLimit/${pageLimit}`, text);
    }

    public getSingleArticle(id: number): AxiosPromise<ArticleModel>{
        return Axios.get(SiteUrl.Article_Single() + `/${id}`);
    }
}