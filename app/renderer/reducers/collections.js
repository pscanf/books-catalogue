import {omit} from "ramda";
import {combineReducers} from "redux";

/*
*   TODO:
*   - handle erros
*   - optimistic updates
*/

import {
    COLLECTION_FETCH_START,
    COLLECTION_FETCH_SUCCESS,
    COLLECTION_FETCH_ERROR,
    COLLECTION_UPSERT_START,
    COLLECTION_UPSERT_SUCCESS,
    COLLECTION_UPSERT_ERROR,
    COLLECTION_REMOVE_START,
    COLLECTION_REMOVE_SUCCESS,
    COLLECTION_REMOVE_ERROR
} from "actions/collections";

function elements (state = {}, action) {
    switch (action.type) {
    case COLLECTION_FETCH_SUCCESS:
        return action.elements.reduce((nextState, element) => ({
            ...nextState,
            [element._id]: element
        }), state);
    case COLLECTION_UPSERT_SUCCESS:
        return {
            ...state,
            [action._id]: {...action.element, _id: action._id}
        };
    case COLLECTION_REMOVE_SUCCESS:
        return omit([action._id], state);
    default:
        return state;
    }
}

function fetching (state = false, action) {
    switch (action.type) {
    case COLLECTION_FETCH_START:
        return true;
    case COLLECTION_FETCH_SUCCESS:
    case COLLECTION_FETCH_ERROR:
        return false;
    default:
        return state;
    }
}

function upserting (state = false, action) {
    switch (action.type) {
    case COLLECTION_UPSERT_START:
        return true;
    case COLLECTION_UPSERT_SUCCESS:
    case COLLECTION_UPSERT_ERROR:
        return false;
    default:
        return state;
    }
}

function removing (state = false, action) {
    switch (action.type) {
    case COLLECTION_REMOVE_START:
        return true;
    case COLLECTION_REMOVE_SUCCESS:
    case COLLECTION_REMOVE_ERROR:
        return false;
    default:
        return state;
    }
}

const collection = combineReducers({
    elements,
    fetching,
    upserting,
    removing
});

export function collections (state = {}, action) {
    switch (action.type) {
    case COLLECTION_FETCH_START:
    case COLLECTION_FETCH_SUCCESS:
    case COLLECTION_FETCH_ERROR:
    case COLLECTION_UPSERT_START:
    case COLLECTION_UPSERT_SUCCESS:
    case COLLECTION_UPSERT_ERROR:
    case COLLECTION_REMOVE_START:
    case COLLECTION_REMOVE_SUCCESS:
    case COLLECTION_REMOVE_ERROR:
        return {
            ...state,
            [action.collection]: collection(state[action.collection], action)
        };
    default:
        return state;
    }
}
