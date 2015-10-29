import React, {Component, PropTypes} from "react";
import * as bootstrap from "react-bootstrap";
import {reduxForm} from "redux-form";

import Spacer from "components/spacer";

const styles = {
    button: {
        width: "100px"
    }
};

@reduxForm()
class UpsertForm extends Component {

    static propTypes = {
        Component: PropTypes.func.isRequired,
        collections: PropTypes.object.isRequired,
        elementId: PropTypes.string,
        fields: PropTypes.object.isRequired,
        handleSubmit: PropTypes.func,
        inserting: PropTypes.bool.isRequired,
        onCancel: PropTypes.func.isRequired
    }

    render () {
        const {
            Component,
            collections,
            elementId,
            fields,
            handleSubmit,
            inserting,
            onCancel
        } = this.props;
        return (
            <div>
                <bootstrap.Modal.Header>
                    <bootstrap.Modal.Title>
                        {inserting ? "Insert form" : "Update form"}
                    </bootstrap.Modal.Title>
                </bootstrap.Modal.Header>
                <bootstrap.Modal.Body>
                    <Spacer direction="v" size={30} />
                    <Component
                        collections={collections}
                        elementId={elementId}
                        fields={fields}
                    />
                </bootstrap.Modal.Body>
                <bootstrap.Modal.Footer>
                    <bootstrap.Col xs={12}>
                        <bootstrap.Button
                            onClick={onCancel}
                            style={styles.button}
                        >
                            {"Cancel"}
                        </bootstrap.Button>
                        <bootstrap.Button
                            bsStyle="success"
                            onClick={handleSubmit}
                            style={styles.button}
                        >
                            {inserting ? "Insert" : "Update"}
                        </bootstrap.Button>
                        <Spacer direction="v" size={10} />
                    </bootstrap.Col>
                </bootstrap.Modal.Footer>
            </div>
        );
    }

}

export default class UpsertFormModalWrapper extends Component {

    static propTypes = {
        // Properties `form` and `fields` are required by reduxForm, and are
        // passed down to UpsertForm with all the other props. We still list
        // them here to document they are indeed required.
        fields: PropTypes.arrayOf(PropTypes.string).isRequired,
        form: PropTypes.string.isRequired,
        onCancel: PropTypes.func.isRequired,
        show: PropTypes.bool.isRequired
    }

    render () {
        const {onCancel, show} = this.props;
        return (
            <bootstrap.Modal
                backdrop="static"
                bsSize="large"
                onHide={onCancel}
                show={show}
            >
                <UpsertForm {...this.props} />
            </bootstrap.Modal>
        );
    }

}
