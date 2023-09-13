import fs from 'node:fs';
import zlib from 'node:zlib';

const compress = (inputPath, outputPath, cb) => {
  const input = fs.createReadStream(inputPath);
  const output = fs.createWriteStream(outputPath);

  input.pipe(zlib.createGzip()).pipe(output);

  output.on('close', () => {
    cb();
  });
};

export default compress;
