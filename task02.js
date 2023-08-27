import { Logger } from './modules/logger.js';

// Задание 2

const logger = new Logger('log.txt', 1024);

logger.on('messageLoaded', message => {
  console.log('Записано сообщение:', message);
});

logger.log('Первое сообщение');
logger.log('Второе сообщение');
