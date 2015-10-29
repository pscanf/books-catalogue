import createHistory from "history/lib/createHashHistory";
import {applyMiddleware, compose, createStore} from "redux";
import logger from "redux-logger";
import {reduxReactRouter} from "redux-router";
import thunk from "redux-thunk";

import rootReducer from "reducers";

export default compose(
    applyMiddleware(
        thunk,
        logger({collapsed: true})
    ),
    reduxReactRouter({createHistory})
)(createStore)(rootReducer);
