import fs, { readdir } from 'node:fs/promises';
import path from 'node:path';

const replaceText = async (file, fromString, toString) => {
  const text = await fs.readFile(file, 'utf-8');
  const newText = text.replaceAll(fromString, toString);
  fs.writeFile(file, newText);
};

export const replaceTextInTxtFiles = (dir, fromString, toString) => {
  let countFiles = 0;

  return readdir(dir)
    .then(files => {
      const promises = files.map(async file => {
        const filePath = path.join(dir, file);
        const stats = await fs.stat(filePath);

        // если текущий файл оказался папкой,
        // срабатывает рекурсивный случай
        // иначе - базовый (замена текста в файле)

        if (stats.isDirectory()) {
          const currentCount = await replaceTextInTxtFiles(
            filePath,
            fromString,
            toString,
          );

          countFiles += currentCount;
        } else if (path.extname(file) === '.txt') {
          countFiles++;
          replaceText(filePath, fromString, toString);
        }
      });

      return Promise.all(promises);
    })
    .then(() => countFiles)
    .catch(err => {
      throw err;
    });
};
