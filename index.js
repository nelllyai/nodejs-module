#!/usr/bin/env node
import fs from 'node:fs';
import hash from './modules/hash.js';
import compress from './modules/compress.js';
import decompress from './modules/decompress.js';
import chalk from 'chalk';

const file = fs.readFileSync('test.jpeg');
const fileHash = hash(file);

fs.writeFileSync('test_jpeg.sha256', fileHash);

compress('test_jpeg.sha256', 'test_jpeg.gz', () => {
  decompress('test_jpeg.gz', 'test_jpeg.jpeg', () => {
    const decompressed = fs.readFileSync('test_jpeg.gz');
    const decompressedHash = hash(decompressed);

    if (fileHash === decompressedHash) {
      console.log(chalk.bgGreen('Хэши до сжатия и после распаковки совпадают'));
    } else {
      console.log(
        chalk.bgRed('Хэши до сжатия и после распаковки НЕ совпадают'),
      );
    }
  });
});
