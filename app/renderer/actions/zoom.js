import webFrame from "web-frame";

export const WINDOW_ZOOM_CHANGE = "WINDOW_ZOOM_CHANGE";

function zoom (delta) {
    return () => {
        const level = webFrame.getZoomLevel() + delta;
        return {
            type: WINDOW_ZOOM_CHANGE,
            level
        };
    };
}

export const zoomIn = zoom(1);
export const zoomOut = zoom(-1);
