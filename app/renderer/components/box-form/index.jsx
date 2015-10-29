import {flatten, map, omit, pipe, prop, values} from "ramda";
import React, {Component, PropTypes} from "react";
import * as bootstrap from "react-bootstrap";

import BooksListInput from "components/books-list-input";

export default class BoxForm extends Component {

    static propTypes = {
        collections: PropTypes.object.isRequired,
        elementId: PropTypes.string,
        fields: PropTypes.object.isRequired
    }

    static fields = [
        "name",
        "books"
    ]

    getBooks () {
        const {
            elementId,
            collections: {
                books = {elements: []},
                boxes = {elements: []}
            }
        } = this.props;
        const boxedBooks = pipe(
            omit([elementId]),
            values,
            map(prop("books")),
            flatten
        )(boxes.elements);
        return pipe(
            omit(boxedBooks),
            values
        )(books.elements);
    }

    render () {
        const {fields: {
            name, books
        }} = this.props;
        return (
            <div>
                <bootstrap.Input
                    autoFocus
                    label="Name"
                    type="text"
                    {...name}
                />
                <BooksListInput
                    books={this.getBooks()}
                    label="Books"
                    {...books}
                />
            </div>
        );
    }

}
