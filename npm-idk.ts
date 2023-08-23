// how to use: npm-idk install

const doesFileExist = async (filename: string): Promise<boolean> => {
  try {
    await Deno.lstat(filename);
    return true;
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      return false;
    } else {
      throw err;
    }
  }
};

let doesNpmLockExist = await doesFileExist("package-lock.json");
let doesYarnLockExist = await doesFileExist("yarn.lock");

let numberOfLockFilesFound = 0;
if (doesNpmLockExist) numberOfLockFilesFound++;
if (doesYarnLockExist) numberOfLockFilesFound++;

if (numberOfLockFilesFound == 0) {
  console.log(
    "Neither package-lock.json nor yarn.lock found in the current directory."
  );
  Deno.exit(1);
}

if (numberOfLockFilesFound > 1) {
  console.log(
    "Both package-lock.json and yarn.lock found in the current directory."
  );
  Deno.exit(1);
}

let command = "npm";
if (doesYarnLockExist) command = "yarn";

const args = Deno.args.slice(0);
const cmd = [command, ...args];

console.log(`running: ${cmd.join(" ")}`);

const npmProcess = Deno.run({
  cmd,
  stdout: "inherit",
  stderr: "inherit"
});

await npmProcess.status();
npmProcess.close();