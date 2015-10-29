import BookForm from "components/book-form";
import BoxForm from "components/box-form";

export const books = {
    UpsertFormComponent: BookForm,
    collectionName: "books",
    tableProperties: ["title", "author", "publicationYear"]
};

export const boxes = {
    UpsertFormComponent: BoxForm,
    collectionName: "boxes",
    tableProperties: ["name", {
        property: "books",
        cell: books => books.length,
        header: "Books"
    }]
};
