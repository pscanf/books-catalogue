import BookForm from "components/book-form";

export const books = {
    UpsertFormComponent: BookForm,
    collectionName: "books",
    tableProperties: ["title", "author", "publicationYear"]
};
