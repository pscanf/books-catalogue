import axios from "axios";

// const BOOKS_ENDPOINT = "/api/books";
const BOOKS_ENDPOINT = "./_assets/books.json";

export const DELETED_BOOK = "DELETED_BOOK";
export const SET_BOOKS_FILTER = "SET_BOOKS_FILTER";
export const INSERTED_BOOK = "INSERTED_BOOK";
export const RECEIVED_BOOK = "RECEIVED_BOOK";
export const RECEIVED_BOOKS = "RECEIVED_BOOKS";
export const REQUESTED_BOOKS = "REQUESTED_BOOKS";

// function deleteBook (bookId) {
//     return {
//         type: DELETED_BOOK,
//         bookId
//     };
// }

function receiveBook (book) {
    return {
        type: RECEIVED_BOOK,
        book
    };
}

function receiveBooks (books) {
    return {
        type: RECEIVED_BOOKS,
        books
    };
}

function requestBooks () {
    return {
        type: REQUESTED_BOOKS
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

export function updateBook (book) {
    return dispatch => {
        return axios.put(`${BOOKS_ENDPOINT}/${book.id}`, book)
            .then(() => dispatch(receiveBook({
                ...book
            })));
            // TODO: catch errors
    };
}

export function insertBook (book) {
    return dispatch => {
        return axios.post(BOOKS_ENDPOINT, book)
            .then(response => dispatch(receiveBook({
                ...book,
                id: response.data
            })));
            // TODO: catch errors
    };
}

export function fetchBooks () {
    return dispatch => {
        dispatch(requestBooks());
        return axios.get(BOOKS_ENDPOINT)
            .then(response => dispatch(receiveBooks(response.data)));
            // TODO: catch errors
    };
}
