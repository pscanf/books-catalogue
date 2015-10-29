import {__, contains, equals, reject} from "ramda";
import React, {Component, PropTypes} from "react";
import * as bootstrap from "react-bootstrap";

import FabButton from "components/fab-button";
import Select from "components/select";
import Spacer from "components/spacer";
import * as colors from "lib/colors";
import {getRandomClassName} from "lib/utils";

export default class BooksListInput extends Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        label: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        value: PropTypes.arrayOf(PropTypes.string)
    }

    static defaultProps = {
        value: []
    }

    constructor () {
        super();
        this.uniqueClassName = getRandomClassName();
    }

    getOptions () {
        const {books, value} = this.props;
        const hasId = contains(__, value);
        return books.filter(({_id}) => !hasId(_id));
    }

    getBooks () {
        const {books, value} = this.props;
        const hasId = contains(__, value);
        return books.filter(({_id}) => hasId(_id));
    }

    handleSelect (selectedId) {
        this.props.onChange(this.props.value.concat([selectedId]));
    }

    handleRemove (removedId) {
        this.props.onChange(reject(equals(removedId), this.props.value));
    }

    renderBooks () {
        return this.getBooks().map(book => (
            <bootstrap.Panel
                key={book._id}
                style={{marginBottom: "4px"}}
            >
                <b>{book.title}</b>
                <Spacer direction="h" size={8} />
                <i>{book.author}</i>
                <FabButton
                    bsSize="xsmall"
                    className="pull-right"
                    icon="content-clear"
                    onClick={this.handleRemove.bind(this, book._id)}
                    style={{color: colors.red}}
                />
            </bootstrap.Panel>
        ));
    }

    renderLabel () {
        return this.props.label ? (
            <label>
                {this.props.label}
            </label>
        ) : null;
    }

    render () {
        return (
            <div className={this.uniqueClassName}>
                {this.renderLabel()}
                <Spacer direction="v" size={16} />
                <Select
                    labelKey="title"
                    onChange={::this.handleSelect}
                    options={this.getOptions()}
                    placeholder={"Choose book\u2026"}
                    value={null}
                    valueKey="_id"
                />
                <Spacer direction="v" size={16} />
                {this.renderBooks()}
                <Spacer direction="v" size={16} />
                <style>
                    {`
                        .${this.uniqueClassName} .panel-body {
                            padding: 10px;
                        }
                    `}
                </style>
            </div>
        );
    }

}
