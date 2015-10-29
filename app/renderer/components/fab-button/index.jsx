import React, {Component, PropTypes} from "react";
import {Button} from "react-bootstrap";

const styles = {
    xsmall: {
        height: "28px",
        width: "28px",
        fontSize: "12px",
        padding: "0px"
    },
    small: {
        height: "42px",
        width: "42px",
        fontSize: "20px",
        padding: "0px"
    },
    medium: {}
};

export default class FabButton extends Component {

    static propTypes = {
        bsSize: PropTypes.string,
        className: PropTypes.string,
        icon: PropTypes.string.isRequired,
        mdi: PropTypes.bool,
        style: PropTypes.object
    }

    static defaultProps = {
        bsSize: "medium",
        className: "",
        mdi: false,
        style: {}
    }

    getClassName () {
        const {className, icon, mdi} = this.props;
        return [
            `btn-fab btn-raised mdi-${icon}`,
            (mdi ? "mdi" : ""),
            className
        ].join(" ");
    }

    render () {
        const {bsSize, className, icon, style, ...props} = this.props;
        return (
            <Button
                className={this.getClassName()}
                style={{...styles[bsSize], ...style}}
                {...props}
            />
        );
    }

}
