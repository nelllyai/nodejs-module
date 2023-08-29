import { createReadStream, createWriteStream } from 'node:fs';
import { readdir } from 'node:fs/promises';
import path from 'node:path';

const mergeTxtFiles = (sourceDir, outputTitle) => {
  const wStream = createWriteStream(
    `${path.dirname(sourceDir)}/${outputTitle}.txt`,
  );
  wStream.setDefaultEncoding('utf-8');

  // запись происходит последовательно,
  // иначе при большом количестве чанков в файле
  // чанк из другого файла появится в середине первого
  readdir(sourceDir)
    .then(async files => {
      for await (const file of files) {
        const extension = path.extname(file);

        if (extension === '.txt') {
          const rStream = createReadStream(`${sourceDir}/${file}`);
          wStream.write(`\n[${file}]\n`);

          for await (const chunk of rStream) {
            wStream.write(chunk);
          }
        }
      }
    })
    .catch(err => {
      console.log('При чтении каталога произошла ошибка:', err.message);
    });
};

mergeTxtFiles('./task02', 'task02Result');
