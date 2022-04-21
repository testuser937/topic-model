import React from "react";
import {Link} from "react-router-dom";

class MonitoringResultTableRow extends React.Component<MonitoringResultTableRowProps, any> {
    render() {
// your link creation
        return (

            <tr>
                <td>{this.props.id}</td>
            <td>{this.props.title}</td>
            <td>
            <Link to={`/article/${this.props.id}`}>
        {this.props.text}
        </Link>

        </td>
        </tr>
    );
    }
}

type MonitoringResultTableRowProps = {
    id: number,
    title: string,
    text: string
}

export default MonitoringResultTableRow;