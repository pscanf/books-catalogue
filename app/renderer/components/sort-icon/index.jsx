import React, {Component, PropTypes} from "react";
import Icon from "components/icon";

export default class SortIcon extends Component {

    static propTypes = {
        direction: PropTypes.oneOf(["ascending", "descending"]).isRequired
    }

    render () {
        return (
            <Icon
                className="pull-right"
                icon={`sort-${this.props.direction}`}
                mdi={true}
                style={{paddingTop: "3px"}}
            />
        );
    }

}
