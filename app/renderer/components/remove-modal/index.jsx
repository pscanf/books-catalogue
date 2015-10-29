import React, {Component, PropTypes} from "react";
import * as bootstrap from "react-bootstrap";

import Spacer from "components/spacer";

const styles = {
    button: {
        width: "100px"
    }
};

export default class RemoveModal extends Component {

    static propTypes = {
        onCancel: PropTypes.func.isRequired,
        onConfirm: PropTypes.func.isRequired,
        show: PropTypes.bool.isRequired
    }

    render () {
        const {onCancel, onConfirm, show} = this.props;
        return (
            <bootstrap.Modal backdrop="static" onHide={onCancel} show={show}>
                <bootstrap.Modal.Header>
                    <bootstrap.Modal.Title>
                        {"Remove"}
                    </bootstrap.Modal.Title>
                </bootstrap.Modal.Header>
                <bootstrap.Modal.Body>
                    <Spacer direction="v" size={30} />
                    {"Are you sure you want to remove this element?"}
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
                            bsStyle="danger"
                            onClick={onConfirm}
                            style={styles.button}
                        >
                            {"Remove"}
                        </bootstrap.Button>
                        <Spacer direction="v" size={10} />
                    </bootstrap.Col>
                </bootstrap.Modal.Footer>
            </bootstrap.Modal>
        );
    }

}
