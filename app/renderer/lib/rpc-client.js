import Client from "electron-rpc/client";

const client = new Client();

export function call (method, ...params) {
    return new Promise(function (resolve, reject) {
        client.request(method, {params}, (error, response) => {
            if (error) {
                reject(error);
            } else {
                resolve(response);
            }
        });
    });
}
