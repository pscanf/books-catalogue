import React, {Component, PropTypes} from "react";
import {merge} from "ramda";

export default class Icon extends Component {

    static propTypes = {
        className: PropTypes.string,
        color: PropTypes.string,
        icon: PropTypes.string.isRequired,
        mdi: PropTypes.bool,
        onClick: PropTypes.func,
        size: PropTypes.string,
        style: PropTypes.object
    }

    static defaultProps = {
        color: "",
        onClick: undefined,
        mdi: false,
        size: "",
        style: {}
    }

    getClassName () {
        const {className, icon, mdi} = this.props;
        return [
            `mdi-${icon}`,
            (mdi ? "mdi" : ""),
            className
        ].join(" ");
    }

    getStyle () {
        return {
            color: this.props.color,
            cursor: (this.props.onClick ? "pointer" : ""),
            fontSize: this.props.size
        };
    }

    render () {
        return (
            <i
                className={this.getClassName()}
                onClick={this.props.onClick}
                style={merge(this.getStyle(), this.props.style)}
            />
        );
    }

}
