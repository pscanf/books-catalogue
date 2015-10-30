import {call} from "lib/rpc-client";

export const COLLECTION_FETCH_START = "COLLECTION_FETCH_START";
export const COLLECTION_FETCH_SUCCESS = "COLLECTION_FETCH_SUCCESS";
export const COLLECTION_FETCH_ERROR = "COLLECTION_FETCH_ERROR";

export function fetch (collection) {
    return dispatch => {
        dispatch({
            type: COLLECTION_FETCH_START,
            collection
        });
        return call(`${collection} fetch`)
            .then(elements => dispatch({
                type: COLLECTION_FETCH_SUCCESS,
                collection,
                elements
            }))
            .catch(error => dispatch({
                type: COLLECTION_FETCH_ERROR,
                collection,
                error
            }))
            .catch(error => console.error(error));
    };
}

export const COLLECTION_UPSERT_START = "COLLECTION_UPSERT_START";
export const COLLECTION_UPSERT_SUCCESS = "COLLECTION_UPSERT_SUCCESS";
export const COLLECTION_UPSERT_ERROR = "COLLECTION_UPSERT_ERROR";

export function upsert (collection, _id, element) {
    return dispatch => {
        dispatch({
            type: COLLECTION_UPSERT_START,
            collection,
            _id,
            element
        });
        return call(`${collection} upsert`, _id, element)
            .then(() => dispatch({
                type: COLLECTION_UPSERT_SUCCESS,
                collection,
                _id,
                element
            }))
            .catch(error => dispatch({
                type: COLLECTION_UPSERT_ERROR,
                collection,
                _id,
                element,
                error
            }))
            .catch(error => console.error(error));
    };
}

export const COLLECTION_REMOVE_START = "COLLECTION_REMOVE_START";
export const COLLECTION_REMOVE_SUCCESS = "COLLECTION_REMOVE_SUCCESS";
export const COLLECTION_REMOVE_ERROR = "COLLECTION_REMOVE_ERROR";

export function remove (collection, _id) {
    return dispatch => {
        dispatch({
            type: COLLECTION_REMOVE_START,
            collection,
            _id
        });
        return call(`${collection} remove`, _id)
            .then(() => dispatch({
                type: COLLECTION_REMOVE_SUCCESS,
                collection,
                _id
            }))
            .catch(error => dispatch({
                type: COLLECTION_REMOVE_ERROR,
                collection,
                _id,
                error
            }))
            .catch(error => console.error(error));
    };
}
