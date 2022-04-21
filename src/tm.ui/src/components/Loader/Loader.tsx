import React from "react";
import './Loader.css'
import {Spinner} from "react-bootstrap";

class Loader extends React.Component<any, any> {
    render() {
        return (
            <Spinner className={'Loader'} animation="border" role="status" variant={'primary'}>
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        )
    }
}

export default Loader;