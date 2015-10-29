import {merge} from "ramda";
import React, {Component} from "react";
import * as bootstrap from "react-bootstrap";
import {Link} from "react-router";

import Icon from "components/icon";
import Spacer from "components/spacer";
import * as colors from "lib/colors";

const styles = {
    books: {
        background: colors.teal
    },
    boxes: {
        background: colors.deeporange
    },
    panel: {
        marginBottom: "0px",
        padding: "15px",
        color: colors.white,
        opacity: "0.9"
    },
    text: {
        height: "48px",
        lineHeight: "48px",
        fontSize: "24px"
    },
    whiteForeground: {
        color: colors.white
    }
};

export default class Home extends Component {

    render () {
        return (
            <bootstrap.Grid fluid>
                <Spacer direction="v" size={100} />
                <bootstrap.Row>
                    <bootstrap.Col xs={3} xsOffset={1}>
                        <Link to="/collection/books">
                            <bootstrap.Panel
                                style={merge(styles.panel, styles.books)}
                            >
                                <bootstrap.Row>
                                    <bootstrap.Col xs={4}>
                                        <Icon
                                            icon="book-open"
                                            mdi={true}
                                            size="48px"
                                            style={styles.whiteForeground}
                                        />
                                    </bootstrap.Col>
                                    <bootstrap.Col
                                        style={styles.text}
                                        xs={8}
                                    >
                                        {"Books"}
                                    </bootstrap.Col>
                                </bootstrap.Row>
                            </bootstrap.Panel>
                        </Link>
                        <br />
                        <Link to="/collection/boxes">
                            <bootstrap.Panel
                                style={merge(styles.panel, styles.boxes)}
                            >
                                <bootstrap.Row>
                                    <bootstrap.Col xs={4}>
                                        <Icon
                                            icon="dropbox"
                                            mdi={true}
                                            size="48px"
                                            style={styles.whiteForeground}
                                        />
                                    </bootstrap.Col>
                                    <bootstrap.Col
                                        style={styles.text}
                                        xs={8}
                                    >
                                        {"Boxes"}
                                    </bootstrap.Col>
                                </bootstrap.Row>
                            </bootstrap.Panel>
                        </Link>
                    </bootstrap.Col>
                </bootstrap.Row>
            </bootstrap.Grid>
        );
    }

}
