import {toPairs} from "ramda";

export default function registerMethods (server, methods) {
    toPairs(methods).forEach(([method, handler]) => {
        server.on(method, ({body: {params}}, cb) => {
            handler(...params)
                .then(res => cb(null, res))
                .catch(err => cb(err, null));
        });
    });
}
