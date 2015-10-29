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
        color: colors.black,
        display: "flex",
        alignItems: "center"
    },
    logo: {
        height: "calc(100% - 4px)",
        margin: "2px"
    }
};

export default class Header extends Component {

    render () {
        return (
            <div style={styles.base}>
                <Link style={styles.logo} to="/">
                    <img src={assets.images.logo} style={styles.logo} />
                </Link>
                <Spacer direction="h" size={20} />
                <Link style={styles.link} to="/collection/books">
                    <Icon icon="book-open" mdi={true} size="18px" />
                    <Spacer direction="h" size={5} />
                    {"Books"}
                </Link>
                <Spacer direction="h" size={20} />
                <Link style={styles.link} to="/collection/boxes">
                    <Icon icon="dropbox" mdi={true} size="18px" />
                    <Spacer direction="h" size={5} />
                    {"Boxes"}
                </Link>
            </div>
        );
    }

}
