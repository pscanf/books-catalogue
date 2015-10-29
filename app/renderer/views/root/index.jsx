import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";

import Header from "components/header";

const styles = {
    header: {
        position: "absolute",
        width: "100%",
        height: "50px",
        top: "0px"
    },
    content: {
        position: "absolute",
        top: "50px",
        width: "100%",
        height: "calc(100% - 50px)"
    }
};

function mapStateToProps (state) {
    return {
        routerState: state.router
    };
}

function mapDispatchToProps (/* dispatch */) {
    return {};
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Root extends Component {

    static propTypes = {
        children: PropTypes.node,
        routerState: PropTypes.object
    }

    componentDidMount () {
    }

    render () {
        return (
            <div>
                <div style={styles.header}>
                    <Header />
                </div>
                <div style={styles.content}>
                    {this.props.children}
                </div>
            </div>
        );
    }

}
