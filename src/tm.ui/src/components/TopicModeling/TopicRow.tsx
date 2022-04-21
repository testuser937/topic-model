import React from "react";

class TopicRow extends React.Component<any, any> {
    render() {

        return (
            <tr>
                <td>{this.props.topicId}</td>
                <td>{this.props.probability.toFixed(2)}</td>
                <td>{this.props.keyWords}</td>
            </tr>
        );
    }
}

export default TopicRow;