export class SiteUrl {
    /*
     * BaseUrl
     */
    static BaseUrl:string = "http://localhost:7777/";

    static TopicModel_Analyze(): string {
        return SiteUrl.BaseUrl + "api/topic-model/analyze";
    }

    static Article_Similar(): string{
        return SiteUrl.BaseUrl + "api/article/similar";
    }

    static Article_Single(): string{
        return SiteUrl.BaseUrl + "api/article";
    }

    static Monitoring_Start(): string{
        return SiteUrl.BaseUrl + "api/monitoring/start"
    }

    static Monitoring_Stop(): string{
        return SiteUrl.BaseUrl + "api/monitoring/stop"
    }

    static Monitoring_All(): string{
        return SiteUrl.BaseUrl + "api/monitoring/all"
    }

    static Monitoring_Single(id: number): string{
        return SiteUrl.BaseUrl + `api/monitoring/single/${id}`;
    }
}