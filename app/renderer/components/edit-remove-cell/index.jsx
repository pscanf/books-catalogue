import React, {Component, PropTypes} from "react";

import FabButton from "components/fab-button";
import Spacer from "components/spacer";
import * as colors from "lib/colors";

export default class EditRemoveCell extends Component {

    static propTypes = {
        onEditClick: PropTypes.func.isRequired,
        onRemoveClick: PropTypes.func.isRequired
    }

    render () {
        return (
            <div
                className="text-right"
                style={{cursor: "pointer"}}
            >
                <FabButton
                    bsSize="xsmall"
                    icon="content-clear"
                    onClick={this.props.onRemoveClick}
                    style={{color: colors.red}}
                />
                <Spacer direction="h" size={10} />
                <FabButton
                    bsSize="xsmall"
                    icon="content-create"
                    onClick={this.props.onEditClick}
                />
                <Spacer direction="h" size={10} />
            </div>
        );
    }

}
