import {resolve} from "bluebird";
import express from "express";

import getCollection from "./get-collection";
import getAssertSchema from "./get-assert-schema";

export default function getCollectionApi (name, schema) {
    const collection = getCollection(name);
    const check = getAssertSchema(schema);
    return express.router()
        .get(`/${name}`, function (req, res) {
            resolve()
                .then(() => collection.find({}))
                .then(elements => res.status(200).send(elements))
                .catch(() => res.status(500).send("Internal server error"));
        })
        .post(`/${name}`, function ({body}, res) {
            resolve()
                .then(() => collection.insert(check(body)))
                .then(() => res.status(201).send())
                .catch(() => res.status(500).send("Internal server error"));
        })
        .put(`/${name}/:_id`, function ({params: {_id}, body}, res) {
            resolve()
                .then(() => collection.update({_id}, {$set: check(body)}))
                .then(() => res.status(200).send())
                .catch(() => res.status(500).send("Internal server error"));
        })
        .del(`/${name}/:_id`, function ({params: {_id}}, res) {
            resolve()
                .then(() => collection.remove({_id}))
                .then(() => res.status(200).send())
                .catch(() => res.status(500).send("Internal server error"));
        });
}
