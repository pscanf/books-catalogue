import express from "express";

import getCollectionApi from "./lib/get-collection-api";
import {book as bookSchema} from "./lib/schemas";

express()
    .use(getCollectionApi("books", bookSchema))
    .listen(process.env.PORT);
