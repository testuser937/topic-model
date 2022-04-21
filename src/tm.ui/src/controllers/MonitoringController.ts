import Axios, {AxiosPromise} from "axios";
import {SiteUrl} from "../components/Settings/Site_Url";
import {PageModel} from "../models/PageModel";
import {MonitoringResultModel} from "../models/MonitoringResultModel";
import {ArticleModel} from "../models/ArticleModel";

export class MonitoringController{
    public getAllResults(): AxiosPromise<PageModel<MonitoringResultModel>>{
        return Axios.get(SiteUrl.Monitoring_All());
    }

    public getSingle(id: number): AxiosPromise<PageModel<ArticleModel>>{
        return Axios.get(SiteUrl.Monitoring_Single(id));
    }
}