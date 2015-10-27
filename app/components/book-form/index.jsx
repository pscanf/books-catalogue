import React, {Component, PropTypes} from "react";
import * as bootstrap from "react-bootstrap";
import {reduxForm} from "redux-form";

import Spacer from "components/spacer";

const styles = {
    button: {
        width: "80px"
    }
};

@reduxForm({
    form: "book",
    fields: ["title", "author", "publicationYear", "boxLabelText"]
})
class BookForm extends Component {

    static propTypes = {
        fields: PropTypes.object.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        inserting: PropTypes.bool.isRequired,
        onCancel: PropTypes.func.isRequired
    }

    renderForm () {
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

    render () {
        const {handleSubmit} = this.props;
        const {inserting, onCancel} = this.props;
        return (
            <div>
                <bootstrap.Modal.Header>
                    <bootstrap.Modal.Title>
                        {inserting ? "Insert new book" : "Edit book"}
                    </bootstrap.Modal.Title>
                </bootstrap.Modal.Header>
                <bootstrap.Modal.Body>
                    <Spacer direction="v" size={30} />
                    {this.renderForm()}
                </bootstrap.Modal.Body>
                <bootstrap.Modal.Footer>
                    <bootstrap.Col xs={12}>
                        <bootstrap.Button
                            bsStyle="success"
                            onClick={handleSubmit}
                            style={styles.button}
                        >
                            {inserting ? "Insert" : "Save"}
                        </bootstrap.Button>
                        <bootstrap.Button
                            bsStyle="danger"
                            onClick={onCancel}
                            style={styles.button}
                        >
                            {"Cancel"}
                        </bootstrap.Button>
                        <Spacer direction="v" size={10} />
                    </bootstrap.Col>
                </bootstrap.Modal.Footer>
            </div>
        );
    }

}

export default class BookFormModalWrapper extends Component {

    static propTypes = {
        onCancel: PropTypes.func.isRequired,
        show: PropTypes.bool.isRequired
    }

    render () {
        const {onCancel, show} = this.props;
        return (
            <bootstrap.Modal backdrop="static" onHide={onCancel} show={show}>
                <BookForm {...this.props} />
            </bootstrap.Modal>
        );
    }

}
