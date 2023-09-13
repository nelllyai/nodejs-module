import fs from 'node:fs';
import zlib from 'node:zlib';

const decompress = (inputPath, outputPath, cb) => {
  const input = fs.createReadStream(inputPath);
  const output = fs.createWriteStream(outputPath);

  input.pipe(zlib.createGunzip()).pipe(output);

  output.on('close', () => {
    cb();
  });
};

export default decompress;
