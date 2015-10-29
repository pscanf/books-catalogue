import React, {Component, PropTypes} from "react";
import * as bootstrap from "react-bootstrap";

export default class BookForm extends Component {

    static propTypes = {
        fields: PropTypes.object.isRequired
    }

    static fields = [
        "title",
        "author",
        "publicationYear",
        "boxLabelText"
    ]

    render () {
        const {fields: {
            title, author, publicationYear, boxLabelText
        }} = this.props;
        return (
            <div>
                <bootstrap.Input
                    autoFocus
                    label="Title"
                    type="text"
                    {...title}
                />
                <bootstrap.Input
                    label="Author"
                    type="text"
                    {...author}
                />
                <bootstrap.Input
                    label="Publication Year"
                    type="text"
                    {...publicationYear}
                />
                <bootstrap.Input
                    label="Box Label Text"
                    type="text"
                    {...boxLabelText}
                />
            </div>
        );
    }

}
