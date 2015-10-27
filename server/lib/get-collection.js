import {promisify} from "bluebird";
import Datastore from "nedb";

export default function getCollection (name) {

    const db = new Datastore({
        filename: `${name}`,
        autoload: true
    });

    return {
        find: promisify(db.find, db),
        findOne: promisify(db.findOne, db),
        update: promisify(db.update, db),
        insert: promisify(db.insert, db),
        remove: promisify(db.remove, db)
    };

}
