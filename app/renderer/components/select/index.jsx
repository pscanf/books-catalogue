import React, {Component, PropTypes} from "react";
import ReactSelect from "react-select";

import * as colors from "lib/colors";
import {getRandomClassName} from "lib/utils";

const styles = {
    string: {
        display: "flex",
        alignItems: "center",
        height: "38px",
        paddingLeft: "11px"
    }
};

export default class Select extends Component {

    static propTypes = {
        disabled: PropTypes.bool,
        labelKey: PropTypes.string,
        onChange: PropTypes.func,
        value: PropTypes.any
    }

    constructor () {
        super();
        this.uniqueClassName = getRandomClassName();
    }

    onChange () {
        this.props.onChange.apply(null, arguments);
        this.forceUpdate();
    }

    renderSelect () {
        return (
            <div>
                <ReactSelect
                    className={this.uniqueClassName}
                    onChange={::this.onChange}
                    {...this.props}
                />
                <style>
                    {`
                        .${this.uniqueClassName} .Select-control {
                            border: 0px;
                            border-radius: 0px;
                            border-style: solid;
                            border-color: ${colors.midgrey};
                            border-bottom-width: 1px;
                        }
                        .${this.uniqueClassName}.is-focused .Select-control {
                            border: 0px;
                            border-radius: 0px;
                            border-style: solid;
                            border-color: ${colors.teal};
                            border-bottom-width: 2px;
                            box-shadow: none;
                        }
                        .${this.uniqueClassName} .Select-menu-outer {
                            width: 102%;
                            left: -1%;
                            border: 1px;
                            border-radius: 0px;
                            border-style: solid;
                            border-color: ${colors.midgrey};
                            box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
                        }
                        .${this.uniqueClassName} .Select-option {
                            padding: 15px;
                        }
                    `}
                </style>
            </div>
        );
    }

    renderString () {
        const {labelKey, value} = this.props;
        return (
            <div style={styles.string}>
                {value ? value[labelKey] : ""}
            </div>
        );
    }

    render () {
        return this.props.disabled ? this.renderString() : this.renderSelect();
    }

}
