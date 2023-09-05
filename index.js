import readline from 'node:readline/promises';
import process from 'node:process';
import { replaceTextInTxtFiles } from './modules/replaceText.js';
import chalk from 'chalk';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const topDir = await rl.question('Введите путь к директории: ');
const stringToFind = await rl.question('Введите строку для поиска: ');
const stringToReplace = await rl.question('Введите строку для замены: ');

replaceTextInTxtFiles(topDir, stringToFind, stringToReplace)
  .then(countFiles => {
    console.log(
      chalk.bgGreen(
        'Поиск и замена были произведены в ' + countFiles + ' файлах.',
      ),
    );
  })
  .catch(err => {
    console.log(chalk.bgRed('Произошла ошибка. ' + err.message));
  })
  .finally(() => rl.close());
