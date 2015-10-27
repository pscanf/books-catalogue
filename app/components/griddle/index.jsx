import Griddle from "griddle-react";
import React, {Component, PropTypes} from "react";

function getRandomClassName () {
    var className = "";
    for (var i = 0; i < 32; i++) {
        className += (Math.random() > 0.5 ? "a" : "b");
    }
    return className;
}

export default class GriddleWrapper extends Component {

    constructor () {
        super();
        this.uniqueClassName = getRandomClassName();
    }

    static propTypes = {
        verticalAlign: PropTypes.string
    }

    static defaultProps = {
        verticalAlign: "middle"
    }

    render () {
        const {verticalAlign, ...props} = this.props;
        return (
            <div className={this.uniqueClassName}>
                <Griddle {...props} />
                <style>
                    {`
                        .${this.uniqueClassName} td {
                            vertical-align: ${verticalAlign} !important;
                        }
                    `}
                </style>
            </div>
        );
    }

}
