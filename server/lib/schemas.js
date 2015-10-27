export const book = {
    $schema: "http://json-schema.org/draft-04/schema#",
    type: "object",
    properties: {
        _id: {
            type: "string"
        },
        title: {
            type: "string"
        },
        author: {
            type: "string"
        },
        publicationYear: {
            type: "string"
        },
        boxLabelText: {
            type: "string"
        }
    },
    required: ["_id"]
};

export const box = {
    $schema: "http://json-schema.org/draft-04/schema#",
    type: "object",
    properties: {
        _id: {
            type: "string"
        },
        name: {
            type: "string"
        },
        books: {
            type: "array"
        }
    },
    required: ["_id"]
};
