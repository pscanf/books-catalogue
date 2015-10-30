import asar from "asar";
import {promisify} from "bluebird";
import fs from "fs";
import {server} from "electron-connect";
import gulp from "gulp";
import loadPlugins from "gulp-load-plugins";
import mkdirp from "mkdirp";
import path from "path";
import proGulp from "pro-gulp";
import webpack from "webpack";

const gp = loadPlugins();



/*
*   Constants
*/

const NODE_ENV = process.env.NODE_ENV || "dev";
const deps = JSON.parse(fs.readFileSync("deps.json", "utf8"));
const baseDir = `builds/${NODE_ENV}`;
const rendererBaseDir = `${baseDir}/renderer`;
const mainBaseDir = `${baseDir}/main`;



/*
*   Builders
*/

proGulp.task("buildElectronManifest", function () {
    return gulp.src("package.json")
        .pipe(gp.preprocess({context: {NODE_ENV}}))
        .pipe(gulp.dest(`${baseDir}/`));
});

proGulp.task("buildElectronMain", function () {
    return gulp.src("app/main/**/*.js")
        .pipe(gp.babel())
        .pipe(gulp.dest(`${mainBaseDir}/`));
});

proGulp.task("buildMainHtml", function () {
    return gulp.src("./app/renderer/main.html")
        .pipe(gp.rename("index.html"))
        .pipe(gulp.dest(`${rendererBaseDir}/`));
});

proGulp.task("buildAppScripts", (function () {
    mkdirp.sync(`${rendererBaseDir}/_assets/js`);
    var compiler = webpack({
        entry: {
            app: "./app/renderer/main.jsx",
            vendor: deps.js
        },
        output: {
            filename: `${rendererBaseDir}/_assets/js/app.js`
        },
        module: {
            loaders: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: "babel"
                },
                {
                    test: /\.json$/,
                    loader: "json"
                }
            ]
        },
        resolve: {
            root: path.join(__dirname, "app/renderer/"),
            extensions: ["", ".web.js", ".js", ".jsx"]
        },
        externals: deps.webpackExternals.reduce((acc, ext) => {
            acc[ext] = `require("${ext}")`;
            return acc;
        }, {}),
        plugins: [
            new webpack.DefinePlugin({
                NODE_ENV: JSON.stringify(NODE_ENV)
            }),
            new webpack.optimize.CommonsChunkPlugin(
                "vendor",
                `${rendererBaseDir}/_assets/js/vendor.js`
            )
        ]
    });
    return promisify(compiler.run, compiler);
})());

proGulp.task("buildAppAssets", function () {
    return gulp.src("app/renderer/assets/**/*")
        .pipe(gulp.dest(`${rendererBaseDir}/_assets/`));
});

proGulp.task("buildVendorStyles", function () {
    return gulp.src(deps.css)
        .pipe(gp.concat("vendor.css"))
        .pipe(gulp.dest(`${rendererBaseDir}/_assets/css/`));
});

proGulp.task("buildVendorFonts", function () {
    return gulp.src(deps.fonts)
        .pipe(gulp.dest(`${rendererBaseDir}/_assets/fonts/`));
});

proGulp.task("build", proGulp.parallel([
    "buildElectronManifest",
    "buildElectronMain",
    "buildMainHtml",
    "buildAppScripts",
    "buildAppAssets",
    "buildVendorStyles",
    "buildVendorFonts"
]));

gulp.task("build", proGulp.task("build"));



/*
*   Linters
*/

proGulp.task("lint", function () {
    return gulp.src(["app/**/*.js", "app/**/*.jsx"])
        .pipe(gp.eslint())
        .pipe(gp.eslint.format());
});

gulp.task("lint", proGulp.task("lint"));



/*
*   Testers
*/

proGulp.task("runUnitTests", function () {
    return gulp.src("./test/unit/**/*unit*")
        .pipe(gp.spawnMocha({
            compilers: "jsx:babel/register",
            env: {
                NODE_PATH: "app:test"
            }
        }))
        .on("error", function () {
            // Swallow errors
            this.emit("end");
        });
});

gulp.task("test", proGulp.task("runUnitTests"));



/*
*   Tasks to setup the development environment
*/

proGulp.task("setupDevServer", function () {
    process.env.NODE_ENV = NODE_ENV;
    const electron = server.create({
        path: baseDir
    });
    electron.start();
    gulp.watch(`${mainBaseDir}/**/*`, electron.restart);
    gulp.watch(`${rendererBaseDir}/**/*`, electron.reload);
});

proGulp.task("setupWatchers", function () {
    gulp.watch(
        "app/renderer/main.html",
        proGulp.task("buildMainHtml")
    );
    gulp.watch(
        ["app/renderer/**/*.jsx", "app/renderer/**/*.js"],
        proGulp.parallel(["buildAppScripts", "lint", "runUnitTests"])
    );
    gulp.watch(
        "app/renderer/assets/**/*",
        proGulp.task("buildAppAssets")
    );
    gulp.watch(
        "app/main/**/*",
        proGulp.task("buildElectronMain")
    );
    gulp.watch(
        ["test/unit/**/*.jsx", "test/unit/**/*.js"],
        proGulp.task("runUnitTests")
    );
});

gulp.task("dev", proGulp.sequence([
    "build",
    "runUnitTests",
    "setupDevServer",
    "setupWatchers"
]));



/*
*   Tasks to deploy
*/

proGulp.task("package", proGulp.task("build"), function () {
    const src = `${baseDir}/`;
    const dst = `${baseDir}.asar`;
    return promisify(asar.createPackage, asar)(src, dst);
});

gulp.task("package", proGulp.task("package"));



/*
*   Default task, used for command line documentation
*/

gulp.task("default", function () {
    gp.util.log("");
    gp.util.log("Usage: " + gp.util.colors.blue("gulp [TASK]"));
    gp.util.log("");
    gp.util.log("Available tasks:");
    gp.util.log("  " + gp.util.colors.green("build") + "     builds the application");
    gp.util.log("  " + gp.util.colors.green("dev") + "       sets up dev environment with auto-recompiling");
    gp.util.log("  " + gp.util.colors.green("lint") + "      lints js and jsx files");
    gp.util.log("  " + gp.util.colors.green("package") + "   packages the application into an asar archive");
    gp.util.log("  " + gp.util.colors.green("test") + "      runs tests");
    gp.util.log("");
    gp.util.log("Environment variables for configuration:");
    gp.util.log("  " + gp.util.colors.cyan("NODE_ENV") + "  (defaults to `dev`)");
    gp.util.log("");
});
