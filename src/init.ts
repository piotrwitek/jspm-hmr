import * as fs from 'fs';
import * as path from 'path';
import { mkdir } from 'shelljs';
import * as readline from 'readline';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export async function initProject() {
  const targetRoot = process.cwd();
  const sourceRoot = path.join(__dirname, '../boilerplate');
  const clientFiles = ['index.html', 'assets/loader-style.css', 'src/app.js', 'src/es6module.js'];
  const serverFiles = ['server.js'];

  // confirm targetRoot folder
  console.log('  Initialization directory -> ' + targetRoot);
  const initConfirmed = await confirmationPromptPromise('  - Is path correct?');

  if (!initConfirmed) {
    console.log('  Initialization aborted.');
    return;
  }

  // check files if exists the ask for confirmation to overwrite
  try {
    const files = [...clientFiles, ...serverFiles];

    for (let file of files) {
      const sourcePath = path.join(sourceRoot, file);
      const targetPath = path.join(targetRoot, file);
      if (await checkFileExistsPromise(targetPath)) {
        console.log(`\n  File "${file}" already exists.`);
        const fileOverwriteConfirmed = await confirmationPromptPromise('  - Overwrite?');

        if (!fileOverwriteConfirmed) {
          console.log('  Skipped');
        } else {
          await copyFilePromise(sourcePath, targetPath);
        }
      }
    }
    console.log('\n Boilerplate initialization completed.');
  } catch (err) {
    console.log('\n Boilerplate initialization failed with error:');
    console.log(err);
  }

  rl.close();
}

function checkFileExistsPromise(file: any): Promise<any> {
  return new Promise((resolve, reject) => {
    fs.access(file, fs.constants.W_OK, (err) => {
      if (err) {
        resolve(false);
      }
      resolve(true);
    });
  });
}

function confirmationPromptPromise(msg: string) {
  return new Promise((resolve, reject) => {
    rl.question(msg + ' (Y)/n: ', (answer) => {
      const parsed = answer.toString().toLowerCase();
      if (parsed === 'y' || parsed === '') {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}

function copyFilePromise(source: string, target: string) {
  return new Promise((resolve, reject) => {
    fs.readFile(source, (err, data) => {
      if (err) reject(err);

      mkdir('-p', path.dirname(target));
      fs.writeFile(target, data, (err2) => {
        if (err2) reject(err2);

        console.log('%s -> %s', source, target);
        resolve(true);
      });
    });
  });
}
