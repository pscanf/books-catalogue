import axios from "axios";

const BOXES_ENDPOINT = "./_assets/boxes.json";

export const RECEIVED_BOXES = "RECEIVED_BOXES";
export const REQUESTED_BOXES = "REQUESTED_BOXES";

function receiveBoxes (boxes) {
    return {
        type: RECEIVED_BOXES,
        boxes
    };
}

function requestBoxes () {
    return {
        type: REQUESTED_BOXES
    };
}

export function fetchBoxes () {
    return dispatch => {
        dispatch(requestBoxes());
        return axios.get(BOXES_ENDPOINT)
            .then(response => dispatch(receiveBoxes(response.data)));
            // TODO: catch errors
    };
}
