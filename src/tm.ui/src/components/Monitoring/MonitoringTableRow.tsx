import React from "react";
import {Link} from "react-router-dom";
import {MonitoringStatus} from "../../models/MonitoringResultModel";

class MonitoringTableRow extends React.Component<MonitoringTableRowProps, any> {
    getStatus(status: MonitoringStatus): string {
        console.log(status);
        switch (status) {
            case MonitoringStatus.InProgress:
                return "В работе";
            case MonitoringStatus.Finished:
                return "Завершен";
            case MonitoringStatus.Stopped:
                return "Остановлен";
        }
    }

    render() {
// your link creation
        const data = {
            topic: this.props.topic,
        };

        return (<tr>
                <td>{this.props.id}</td>
                <td>{this.getStatus(this.props.status)}</td>
                <td>
                    <Link to={`/monitoringResult/${this.props.id}`} state={data}>
                        {this.props.topic}
                    </Link>

                </td>
            </tr>);
    }
}

type MonitoringTableRowProps = {
    id: number, status: MonitoringStatus, topic: string
}

export default MonitoringTableRow;