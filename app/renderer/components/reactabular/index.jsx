import {Table} from "reactabular";
import React, {Component} from "react";

import {getRandomClassName} from "lib/utils";

export default class Reactabular extends Component {

    constructor () {
        super();
        this.uniqueClassName = getRandomClassName();
    }

    render () {
        return (
            <div className={this.uniqueClassName}>
                <Table {...this.props} />
                <style>
                    {`
                        .${this.uniqueClassName} td,
                        .${this.uniqueClassName} th {
                            vertical-align: middle !important;
                        }
                    `}
                </style>
            </div>
        );
    }

}
