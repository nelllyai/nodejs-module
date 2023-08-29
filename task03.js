import sharp from 'sharp';

const resizeImage = (inputPath, outputPath) => {
  sharp(inputPath)
    .resize(400, 400, { fit: 'cover', withoutReduction: true })
    .toFormat('jpeg')
    .toFile(outputPath)
    .catch(err => {
      console.log('Произошла ошибка при обработке изображения:', err.message);
    });
};

const filterImage = (inputPath, outputPath) => {
  sharp(inputPath)
    .threshold()
    .blur(5)
    .toFormat('jpeg')
    .toFile(outputPath)
    .catch(err => {
      console.log('Произошла ошибка при обработке изображения:', err.message);
    });
};

resizeImage('imgToResize.jpeg', 'imgAfterResize.jpeg');
filterImage('imgToFilter.jpeg', 'imgAfterFilter.jpeg');
