process.env.BABEL_ENV = "production";
process.env.NODE_ENV = "production";

const rm = require("rimraf");
const ora = require("ora");
const chalk = require("chalk");
const path = require("path");
const webpack = require("webpack");
const webpackConfig = require("./config");

const spinner = ora("building for production...");
spinner.start();
rm(path.resolve(__dirname, "../build"), err => {
  if (err) throw err;
  webpack(webpackConfig, (err, stats) => {
    spinner.stop();
    if (err) throw err;
    process.stdout.write(
      stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + "\n\n"
    );

    if (stats.hasErrors()) {
      console.log(chalk.red("  Build failed with errors.\n"));
      process.exit(1);
    }

    console.log(chalk.green("  Compiled successfully.\n"));
    console.log(
      chalk.yellow(
        "  Tip: built files are meant to be served over an HTTP server.\n" +
          "  Opening index.html over file:// won't work.\n\n"
      ),
      chalk.yellow(
        "  The build folder is ready to be deployed.\n" +
          "  You may serve it with a static server:\n\n"
      ),
      chalk.green("  yarn global add serve\n   serve - s build\n")
    );
  });
});
