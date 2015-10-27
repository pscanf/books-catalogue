import {combineReducers} from "redux";
import {routerStateReducer as router} from "redux-router";
import {reducer as form} from "redux-form";

import {books, booksFilter, fetchingBooks} from "reducers/books";
import {boxes, fetchingBoxes} from "reducers/boxes";

const rootReducer = combineReducers({
    books,
    booksFilter,
    fetchingBooks,
    boxes,
    fetchingBoxes,
    router,
    form
});

export default rootReducer;
