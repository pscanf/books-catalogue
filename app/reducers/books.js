import {RECEIVED_BOOKS, REQUESTED_BOOKS, SET_BOOKS_FILTER} from "actions/books";

export function booksFilter (state = "", action) {
    switch (action.type) {
    case SET_BOOKS_FILTER:
        return action.searchTerm;
    default:
        return state;
    }
}

export function books (state = {}, action) {
    switch (action.type) {
    case RECEIVED_BOOKS:
        return action.books;
    default:
        return state;
    }
}

export function fetchingBooks (state = false, action) {
    switch (action.type) {
    case REQUESTED_BOOKS:
        return true;
    case RECEIVED_BOOKS:
        return false;
    default:
        return state;
    }
}
