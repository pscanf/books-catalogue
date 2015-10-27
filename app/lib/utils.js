import Fuse from "fuse.js";

export function getBoxLabelText (book) {
    const {title, author, publicationYear, boxLabelText} = book;
    return boxLabelText || `${title} ${author} ${publicationYear}`;
}

export function fuzzyFilter (list, term, keys) {
    const f = new Fuse(list, {keys});
    return term ? f.search(term) : list;
}
