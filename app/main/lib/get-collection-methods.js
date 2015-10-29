import getCollection from "./get-collection";

export default function getCollectionMethods (name) {
    const collection = getCollection(name);
    return {
        [`${name} fetch`] () {
            return collection.find({});
        },
        [`${name} upsert`] (_id, element) {
            return collection.update({_id}, {$set: element}, {upsert: true});
        },
        [`${name} remove`] (_id) {
            return collection.remove({_id});
        }
    };
}
