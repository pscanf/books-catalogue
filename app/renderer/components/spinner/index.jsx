import Loader from "halogen/ClipLoader";
import React, {Component, PropTypes} from "react";

import * as colors from "lib/colors";

export default class Spinner extends Component {

    static propTypes = {
        height: PropTypes.string
    }

    static defaultProps = {
        height: "100%"
    }

    render () {
        return (
            <div
                style={{
                    height: this.props.height,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Loader
                    color={colors.teal}
                    margin="0px"
                    size="48px"
                />
            </div>
        );
    }

}
