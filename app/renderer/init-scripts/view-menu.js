import {bindActionCreators} from "redux";
import remote from "remote";

const app = remote.require("app");
const menu = remote.require("menu");

import {zoomIn, zoomOut} from "actions/zoom";
import {dispatch} from "lib/redux-store";

const template = [
    {
        label: app.getName(),
        submenu: [{
            label: "Quit",
            accelerator: "Command+Q",
            click: ::app.quit
        }]
    },
    {
        label: "View",
        submenu: [
            {
                label: "Zoom In",
                accelerator: "CmdOrCtrl+Plus",
                click: bindActionCreators(zoomIn, dispatch)
            },
            {
                label: "Zoom Out",
                accelerator: "CmdOrCtrl+-",
                click: bindActionCreators(zoomOut, dispatch)
            },
            {
                label: "Reload",
                accelerator: "CmdOrCtrl+R",
                click: (item, focusedWindow) => focusedWindow && focusedWindow.reload()
            }
        ]
    }
];

menu.setApplicationMenu(
    menu.buildFromTemplate(template)
);
