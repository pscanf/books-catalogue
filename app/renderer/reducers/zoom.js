import {WINDOW_ZOOM_CHANGE} from "actions/zoom";

export function zoomLevel (state = 0, {type, level}) {
    switch (type) {
    case WINDOW_ZOOM_CHANGE:
        return level;
    default:
        return state;
    }
}
