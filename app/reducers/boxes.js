import {RECEIVED_BOXES, REQUESTED_BOXES} from "actions/boxes";

export function boxes (state = {}, action) {
    switch (action.type) {
    case RECEIVED_BOXES:
        return action.boxes;
    default:
        return state;
    }
}

export function fetchingBoxes (state = false, action) {
    switch (action.type) {
    case REQUESTED_BOXES:
        return true;
    case RECEIVED_BOXES:
        return false;
    default:
        return state;
    }
}
