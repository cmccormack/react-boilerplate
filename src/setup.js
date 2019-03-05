const fs = require("fs");
const exec = require("child_process").exec;
const chalk = require("chalk");
const shell = require("shelljs");

const writeCheck = () => {
  process.stdout.write(chalk.green(" ✓"));
};

const writeMark = () => {
  process.stdout.write(chalk.red(" ✘"));
};

const writeArrow = () => {
  process.stdout.write(chalk.yellow("↪  "));
};

const isModuleInstalled = module => {
  return shell.exec(`npm ls ${module}`, { silent: true }).code === 0;
};

const uninstallModule = (module, env = "-S") => {
  shell.exec(`npm uninstall ${env} ${module}`, { silent: true });
  return !isModuleInstalled(module);
};

const installModule = (module, env = "-S") => {
  shell.exec(`npm install ${env} ${module}`, { silent: true });
  return isModuleInstalled(module);
};

const endProcess = error => {
  if (error) {
    return process.stdout.write(`\nSetup Failed: ${error}\n`);
  }
  process.stdout.write("\nSetup Completed Successfully!  🎉\n");
  process.exit(0);
};

const initGit = cb => {
  cb = cb || function() {};
  exec('git init && git add . && git commit -m "Initial commit"', cb);
};

const removeGitRepo = () => {
  fs.readFile(".git/config", "utf8", (err, data) => {
    if (err || typeof data !== "string") {
      process.stdout.write(
        "\nError accessing .git/config, creating new repository..."
      );
      shell.rm("-rf", ".git/");
      if (shell.error()) {
        writeMark();
        return endProcess("Unable to remove existing git repository.");
      }
      writeCheck();
      return initGit(endProcess);
    }

    if (!/cmccormack\/react-boilerplate\.git/.test(data)) {
      process.stdout.write("\nNothing to do - all tasks completed");
      writeCheck();
      return endProcess();
    }

    process.stdout.write("\nDo you want to clear old repository? [Y/n] ");
    process.stdin.resume();
    process.stdin.on("data", data => {
      let val = data.toString().trim();
      if (val === "y" || val === "Y" || val === "") {
        process.stdout.write("\nRemoving existing git repository...");
        shell.rm("-rf", ".git/");
        shell.error() ? writeMark() : writeCheck();
        process.stdout.write("\nCreating new git repository...");
        initGit(err => {
          err ? writeMark() : writeCheck();
          endProcess();
        });
      } else {
        endProcess();
      }
    });
  });
};

const run = async () => {
  if (isModuleInstalled("node-sass")) {
    process.stdout.write("Attempting to uninstall node-sass...");
    if (uninstallModule("node-sass", "-D")) {
      await writeCheck();
    } else {
      process.stdout.write(`${chalk.red(" ✘")}\n${chalk.yellow("↪  ")}`);
      writeArrow();
      process.stdout.write("Unable to uninstall node-sass.  ");
    }
  }
};

// run()
removeGitRepo();
