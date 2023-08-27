import { copyFolder } from './modules/copyFolder.js';

// Задание 1

copyFolder('./folderToCopy', './copiedFolder', err => {
  console.time('Время копирования');
  if (err) {
    console.error('При копировании произошла ошибка:', err.message);
  } else {
    console.log('Копирование папки прошло успешно');
    console.timeEnd('Время копирования');
  }
});
