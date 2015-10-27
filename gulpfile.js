var BPromise    = require("bluebird");
var browserSync = require("browser-sync");
var fs          = require("fs");
var gulp        = require("gulp");
var gp          = require("gulp-load-plugins")();
var mkdirp      = require("mkdirp");
var path        = require("path");
var proGulp     = require("pro-gulp");
var R           = require("ramda");
var webpack     = require("webpack");



/*
*   Constants
*/

var NODE_ENV  = process.env.NODE_ENV || "dev";
var MINIFY_FILES = (NODE_ENV === "prod") || false;

var deps = JSON.parse(fs.readFileSync("deps.json", "utf8"));



/*
*   Builders
*/

proGulp.task("buildMainHtml", function () {
    return gulp.src("app/main.html")
        .pipe(gp.preprocess({context: {NODE_ENV: NODE_ENV}}))
        .pipe(gp.rename("index.html"))
        .pipe(gulp.dest("builds/" + NODE_ENV + "/"));
});

proGulp.task("buildAppScripts", (function () {
    var targetDir = "builds/" + NODE_ENV + "/_assets/js/";
    mkdirp.sync(targetDir);
    var compiler = webpack({
        entry: {
            app: "./app/main.jsx",
            vendor: deps.js
        },
        output: {
            filename: targetDir + "app.js"
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
            root: path.join(__dirname, "app"),
            extensions: ["", ".web.js", ".js", ".jsx"]
        },
        plugins: [
            new webpack.DefinePlugin({
                NODE_ENV: JSON.stringify(NODE_ENV)
            }),
            new webpack.optimize.CommonsChunkPlugin(
                "vendor",
                targetDir + "vendor.js"
            ),
            MINIFY_FILES ? new webpack.optimize.UglifyJsPlugin() : null
        ].filter(R.identity)
    });
    return function () {
        return BPromise.promisify(compiler.run, compiler)();
    };
})());

proGulp.task("buildAppAssets", function () {
    return gulp.src("app/assets/**/*")
        .pipe(gulp.dest("builds/" + NODE_ENV + "/_assets/"));
});

proGulp.task("buildVendorStyles", function () {
    return gulp.src(deps.css)
        .pipe(gp.concat("vendor.css"))
        .pipe(gp.if(MINIFY_FILES, gp.minifyCss()))
        .pipe(gulp.dest("builds/" + NODE_ENV + "/_assets/css/"));
});

proGulp.task("buildVendorFonts", function () {
    return gulp.src(deps.fonts)
        .pipe(gulp.dest("builds/" + NODE_ENV + "/_assets/fonts/"));
});

proGulp.task("build", proGulp.parallel([
    "buildMainHtml",
    "buildAppScripts",
    "buildAppAssets",
    "buildVendorStyles",
    "buildVendorFonts"
]));

gulp.task("build", proGulp.task("build"));



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



/*
*   Tasks to setup the development environment
*/

proGulp.task("setupDevServer", function () {
    var isAsset = R.test(/_assets/);
    var isReport = R.test(/_report/);
    browserSync({
        server: {
            baseDir: "builds/",
            middleware: function (req, res, next) {
                /*
                *   Set correct urls for `_assets` and `_reports`
                */
                if (isAsset(req.url)) {
                    req.url = `/${NODE_ENV + req.url}`;
                } else if (!isReport(req.url)) {
                    req.url = `/${NODE_ENV}/index.html`;
                }
                next();
            }
        },
        files: `./builds/${NODE_ENV}/**/*`,
        port: 8080,
        ghostMode: false,
        injectChanges: false,
        notify: false,
        open: false
    });
});

proGulp.task("setupWatchers", function () {
    gulp.watch(
        "app/main.html",
        proGulp.task("buildMainHtml")
    );
    gulp.watch(
        ["app/**/*.jsx", "app/**/*.js"],
        proGulp.parallel(["buildAppScripts", "runUnitTests"])
    );
    gulp.watch(
        "app/assets/**/*",
        proGulp.task("buildAppAssets")
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

proGulp.task("deploy", proGulp.task("build"), function () {
});

gulp.task("deploy", proGulp.task("deploy"));



/*
*   Default task, used for command line documentation
*/

gulp.task("default", function () {
    gp.util.log("");
    gp.util.log("Usage: " + gp.util.colors.blue("gulp [TASK]"));
    gp.util.log("");
    gp.util.log("Available tasks:");
    gp.util.log("  " + gp.util.colors.green("build") + "   build the application (use environment variables to customize the build)");
    gp.util.log("  " + gp.util.colors.green("dev") + "     set up dev environment with auto-recompiling");
    gp.util.log("");
    gp.util.log("Environment variables for configuration:");
    gp.util.log("  " + gp.util.colors.cyan("NODE_ENV") + "        (defaults to `dev`)");
    gp.util.log("");
});
