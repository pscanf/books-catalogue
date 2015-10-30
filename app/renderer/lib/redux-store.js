import createHistory from "history/lib/createHashHistory";
import {applyMiddleware, compose, createStore} from "redux";
import persistState from "redux-localstorage";
import logger from "redux-logger";
import {reduxReactRouter} from "redux-router";
import thunk from "redux-thunk";

import rootReducer from "reducers";

export default compose(
    applyMiddleware(
        thunk,
        logger({collapsed: true}),
    ),
    persistState(["zoomLevel"]),
    reduxReactRouter({createHistory})
)(createStore)(rootReducer);
