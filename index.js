// import { read } from './modules/read.js';
// import { write } from './modules/write.js';

// const app = async () => {
//   try {
//     // const data = await read('./folderToCopy/text.txt');
//     // console.log('data:', data);

//     // await write('./newBook.pdf', data);

//     // const bufferUnsafe = Buffer.allocUnsafe(3);
//     // const bufferSafe = Buffer.alloc(1024, 'learning node.js');
//     // await write('./newBook.txt', bufferSafe);
//     // console.log(bufferUnsafe);
//     // console.log(bufferSafe);

//     // const bufferArr1 = Buffer.from([78, 15, 20, 5]);
//     // const bufferArr2 = Buffer.from([30, 35, 40, 5]);
//     // const bufferArr = Buffer.concat([bufferArr1, bufferArr2]);
//     // console.log(bufferArr);
//     // console.log(bufferArr.toString('utf-8'));
//     // console.log(Array.from(bufferArr));

//     // const buffer = Buffer.allocUnsafe(10);
//     // buffer.fill('ab');
//     // console.log(buffer);

//     const bufferStr1 = Buffer.from('learning node.js');
//     const bufferStr2 = Buffer.from('learning node.js');
//     console.log(bufferStr1.equals(bufferStr2));

//     const bufferStr = Buffer.from('learning buffer at node.js');
//     console.log(bufferStr.toString('utf-8', 9, 15));
//     console.log(bufferStr.toString('utf-8', 9));
//     console.log(bufferStr.indexOf('node'));
//     console.log(bufferStr.includes('node.ts'));
//     console.log(
//       bufferStr.subarray(9, 15),
//       bufferStr.subarray(9, 15).toString(),
//     );
//     console.log(bufferStr.toJSON());
//     console.log(Buffer.isBuffer(bufferStr));
//     console.log(Buffer.isBuffer('not buffer'));
//   } catch (error) {
//     console.log(error);
//   }
// };

// app();

import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';

const copy = async (from, to) => {
  try {
    await pipeline(createReadStream(from), createWriteStream(to));

    console.log('done');
  } catch (error) {
    console.log('Ошибка', error);
  }
};

copy('./folderToCopy/icon.ico', './copyIcon.ico');

const wStream = createWriteStream('./write.txt');
const rStream = createReadStream('./folderToCopy/text.txt');

wStream.on('pipe', () => {
  console.log('PIPE - подключение к readable стриму');
});

wStream.on('unpipe', () => {
  console.log('UNPIPE - отключение от readable стрима');
});

wStream.on('finish', () => {
  console.log('FINISH - запись завершилась');
});

wStream.on('drain', () => {
  console.log('DRAIN - освободился буфер у writable');
});

wStream.on('error', err => {
  console.log('ERROR - произошла ошибка', err.message);
});

wStream.on('close', () => {
  console.log('CLOSE - стрим закрыт');
});

// wStream.write('insert into\n');

// const buffer = Buffer.from('buffer');
// for (let i = 0; i < 10000; i++) {
//   wStream.write(buffer, 'utf-8', () => {
//     // console.log('Данные записываются');
//   });
// }

// wStream.write(buffer, 'utf-8', () => {
//   console.log('Данные записываются');
// });

// wStream.cork();

// setTimeout(() => {
//   wStream.uncork();
// }, 2000);

wStream.setDefaultEncoding('utf-8');

// console.log(wStream.writableCorked);
// console.log(wStream.errored);
// console.log(wStream.writableLength);
// console.log(wStream.writableHighWaterMark);

// rStream.pipe(wStream);

rStream.on('data', chunk => {
  console.log('---data---');
  console.log('chunk', chunk);
  wStream.write(chunk);
  // rStream.destroy('oops');

  // rStream.pause();
  // console.log('pause');

  // setTimeout(() => {
  //   console.log('resume');
  //   rStream.resume();
  // }, 500);
});

// rStream.on('readable', () => {
//   console.log('---readable---');
//   const buffer = rStream.read();
//   console.log('buffer', buffer);
//   if (buffer) {
//     wStream.write(buffer);
//   }
// });

rStream.on('end', () => {
  console.log('---end---');
  wStream.close();
});

rStream.on('pause', () => {
  console.log('---pause---');
});

rStream.on('resume', () => {
  console.log('---resume---');
});

rStream.on('error', err => {
  console.log('---error---');
  console.log(err);
});

rStream.on('close', () => {
  console.log('---close---');
});

// wStream.end('Закрываем stream');
// wStream.destroy('destroy');

const readStream = async path => {
  const stream = createReadStream(path);
  for await (const chunk of stream) {
    console.log(chunk);
  }
};

readStream('./folderToCopy/text.txt');
