import app from "app";
import BrowserWindow from "browser-window";
import Server from "electron-rpc/server";

import getCollectionMethods from "./lib/get-collection-methods";
import registerMethods from "./lib/register-methods";

var mainWindow = null;

app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("ready", function () {
    mainWindow = new BrowserWindow({});
    mainWindow.loadUrl(`file://${__dirname}/../renderer/index.html`);
    mainWindow.on("closed", function () {
        mainWindow = null;
    });
    if (process.env.NODE_ENV === "dev") {
        mainWindow.openDevTools();
    }
    const server = new Server(mainWindow.webContents);
    registerMethods(server, getCollectionMethods("books"));
    registerMethods(server, getCollectionMethods("boxes"));
});
