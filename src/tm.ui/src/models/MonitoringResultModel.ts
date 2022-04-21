export class MonitoringResultModel{
    Id: number;
    Status: MonitoringStatus;
    Topic: string;

    constructor(id: number, status: MonitoringStatus, topic: string) {
        this.Id = id;
        this.Status = status;
        this.Topic = topic;
    }
}

export enum MonitoringStatus{
    InProgress = 1,
    Finished = 2,
    Stopped = 3
}