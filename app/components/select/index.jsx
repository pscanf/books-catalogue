import React, {Component, PropTypes} from "react";
import ReactSelect from "react-select";

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

    onChange () {
        this.props.onChange.apply(null, arguments);
        this.forceUpdate();
    }

    renderSelect () {
        return (
            <ReactSelect
                {...this.props}
                onChange={::this.onChange}
            />
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
