import {combineReducers} from "redux";
import {routerStateReducer as router} from "redux-router";
import {reducer as form} from "redux-form";

import {collections} from "reducers/collections";
import {zoomLevel} from "reducers/zoom";

const rootReducer = combineReducers({
    collections,
    zoomLevel,
    router,
    form
});

export default rootReducer;
