import {call} from "lib/rpc-client";

function getConstants (name) {
    return {
        _GET_START = "BOOKS_GET_START";
        _GET_SUCCESS = "BOOKS_GET_SUCCESS";
        _GET_ERROR = "BOOKS_GET_ERROR";    
    }
}

export default class Collection {

    constructor (name) {
        this.name = name;
        this.constants = getConstants(name);
    }

}



export function getBooks () {
    return dispatch => {
        dispatch({
            type: BOOKS_GET_START
        });
        return call("/books/get")
            .then(books => dispatch({
                type: BOOKS_GET_SUCCESS,
                books
            }))
            .catch(error => dispatch({
                type: BOOKS_GET_ERROR,
                error
            }));
            // TODO: catch errors
    };
}

export const BOOKS_SET_START = "BOOKS_SET_START";
export const BOOKS_SET_SUCCESS = "BOOKS_SET_SUCCESS";
export const BOOKS_SET_ERROR = "BOOKS_SET_ERROR";

export const BOOKS_DEL_START = "BOOKS_DEL_START";
export const BOOKS_DEL_SUCCESS = "BOOKS_DEL_SUCCESS";
export const BOOKS_DEL_ERROR = "BOOKS_DEL_ERROR";


function _delBook (bookId) {
    return {
        type: DELETED_BOOK,
        bookId
    };
}

function _setBook (book) {
    return {
        type: BOOK_ADDED,
        book
    };
}

function _getBooks () {
    return {
        type: BOOKS_REQUESTED
    };
}

// export function deleteBook (bookId) {
//     return dispatch => {
//         return axios.del(`${BOOKS_ENDPOINT}/${bookId}`)
//             .then(() => dispatch(deleteBook(bookId)));
//             // TODO: catch errors
//     };
// }

export function setBooksFilter (searchTerm) {
    return {
        type: SET_BOOKS_FILTER,
        searchTerm
    };
}

export function setBook (book) {
    return dispatch => {
        dispatch(requestBooks());
        return call("/books/get")
            .then(books => dispatch(receiveBooks(books)));
            // TODO: catch errors
    };
}
//
// export function insertBook (book) {
//     return dispatch => {
//         return axios.post(BOOKS_ENDPOINT, book)
//             .then(response => dispatch(receiveBook({
//                 ...book,
//                 id: response.data
//             })));
//             // TODO: catch errors
//     };
// }
