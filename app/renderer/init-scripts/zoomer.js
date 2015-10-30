import webFrame from "web-frame";

import store from "lib/redux-store";

store.subscribe(() => webFrame.setZoomLevel(
    store.getState().zoomLevel
));
