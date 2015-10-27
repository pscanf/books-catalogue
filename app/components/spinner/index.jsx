import Loader from "halogen/ClipLoader";
import React, {Component} from "react";

export default class Spinner extends Component {

    render () {
        return (
            <Loader
                color="#26A65B"
                margin="4px"
                size="16px"
            />
        );
    }

}
