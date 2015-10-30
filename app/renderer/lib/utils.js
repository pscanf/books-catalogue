import {test, path} from "ramda";

export function getBoxLabelText (book) {
    const {title, author, publicationYear, boxLabelText} = book;
    return boxLabelText || `${title} ${author} ${publicationYear}`;
}

export function fuzzyFilter (list, term, keys) {
    const match = test(new RegExp(term, "i"));
    keys = keys.map(key => key.split("."));
    return list.filter(element => (
        keys.reduce((matches, key) => (
            matches ? matches : match(path(key, element))
        ), false)
    ));
}

export function getRandomClassName () {
    var className = "";
    for (var i = 0; i < 32; i++) {
        className += (Math.random() > 0.5 ? "a" : "b");
    }
    return className;
}
