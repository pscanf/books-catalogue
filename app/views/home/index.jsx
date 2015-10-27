import React, {Component} from "react";
import * as bootstrap from "react-bootstrap";
import {Link} from "react-router";

import Spacer from "components/spacer";

export default class Home extends Component {

    render () {
        return (
            <bootstrap.Grid fluid>
                <Spacer direction="v" size={30} />
                <bootstrap.Row>
                    <bootstrap.Col xs={6} xsOffset={3}>
                        <Link to="/books">
                            {"Books"}
                        </Link>
                        <br />
                        <Link to="/boxes">
                            {"Boxes"}
                        </Link>
                    </bootstrap.Col>
                </bootstrap.Row>
            </bootstrap.Grid>
        );
    }

}
