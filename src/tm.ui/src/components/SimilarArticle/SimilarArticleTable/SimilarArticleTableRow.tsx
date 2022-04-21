import React from "react";
import {Link} from "react-router-dom";

class SimilarArticleTableRow extends React.Component<SimilarArticleTableRowProps, any> {
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

type SimilarArticleTableRowProps = {
    id: number,
    title: string,
    text: string
}

export default SimilarArticleTableRow;