import Fuse from "fuse.js";

export function getBoxLabelText (book) {
    const {title, author, publicationYear, boxLabelText} = book;
    return boxLabelText || `${title} ${author} ${publicationYear}`;
}

export function fuzzyFilter (list, term, keys) {
    const f = new Fuse(list, {keys});
    return term ? f.search(term) : list;
}

export function getRandomClassName () {
    var className = "";
    for (var i = 0; i < 32; i++) {
        className += (Math.random() > 0.5 ? "a" : "b");
    }
    return className;
}
