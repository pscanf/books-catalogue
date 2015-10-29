import {combineReducers} from "redux";
import {routerStateReducer as router} from "redux-router";
import {reducer as form} from "redux-form";

import {collections} from "reducers/collections";

const rootReducer = combineReducers({
    collections,
    router,
    form
});

export default rootReducer;
