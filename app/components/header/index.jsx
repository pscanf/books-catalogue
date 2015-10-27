import React, {Component} from "react";
import {Link} from "react-router";

import Icon from "components/icon";
import Spacer from "components/spacer";
import * as assets from "lib/assets";
import * as colors from "lib/colors";

const styles = {
    base: {
        display: "flex",
        alignItems: "center",
        padding: "5px",
        borderWidth: "0px",
        borderBottomWidth: "1px",
        borderStyle: "solid",
        borderColor: colors.grey,
        width: "100%",
        height: "100%"
    },
    link: {
        color: colors.black
    },
    logo: {
        height: "100%"
    }
};

export default class Header extends Component {

    render () {
        return (
            <div style={styles.base}>
                <img src={assets.images.logo} style={styles.logo} />
                <Spacer direction="h" size={20} />
                <Link style={styles.link} to="/books">
                    <Icon icon="book" />
                    <Spacer direction="h" size={5} />
                    {"Books"}
                </Link>
                <Spacer direction="h" size={20} />
                <Link style={styles.link} to="/boxes">
                    <Icon icon="archive" />
                    <Spacer direction="h" size={5} />
                    {"Boxes"}
                </Link>
            </div>
        );
    }

}
