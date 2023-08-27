import fs from 'node:fs/promises';
import { readdir, mkdir, copyFile } from 'node:fs/promises';

export const copyFolder = (sourceDir, targetDir, callback) => {
  readdir(sourceDir)
    .then(async files => {
      await mkdir(targetDir, { recursive: true });
      return files;
    })
    .then(files => {
      files.forEach(async file => {
        const stats = await fs.stat(`${sourceDir}/${file}`);

        // если текущий файл оказался папкой,
        // срабатывает рекурсивный случай (копирование папки),
        // иначе - базовый (копирование файла)
        if (stats.isDirectory()) {
          copyFolder(`${sourceDir}/${file}`, `${targetDir}/${file}`, callback);
        } else {
          await copyFile(`${sourceDir}/${file}`, `${targetDir}/${file}`);
        }
      });
    })
    .then(() => {
      callback(null);
    })
    .catch(error => {
      callback(error);
    });
};
