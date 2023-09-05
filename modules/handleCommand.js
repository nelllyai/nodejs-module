import chalk from 'chalk';
import { tasksList } from './tasks.js';

export const handleCommand = async ([, , ...argv]) => {
  const reportNotFound = id => {
    console.log(chalk.red(`Задача #${id} не найдена!`));
  };

  const getSuccessfulMessage = text => {
    console.log(chalk.green(text));
  };

  if (argv.includes('-hd')) {
    tasksList.homedir = true;
    argv.splice(argv.indexOf('-hd'), 1);
  }

  // инициализация списка из файла
  await tasksList.init();

  // добавление задачи
  if (argv[0] === 'add' && argv[1]) {
    const newTaskId = tasksList.add(argv[1]);
    getSuccessfulMessage(`Задача #${newTaskId} добавлена`);
    return;
  }

  // вывод списка из файла
  if (argv[0] === 'list') {
    console.log(chalk.bgGreen('Список задач:'));
    tasksList.list.forEach((item, index) => {
      console.log(`${index + 1}. [${item.status}] ${item.title}`);
    });
    return;
  }

  // получение описания задачи по id
  if (argv[0] === 'get' && !isNaN(argv[1])) {
    try {
      getSuccessfulMessage(tasksList.getById(argv[1]));
    } catch {
      reportNotFound(argv[1]);
    }
    return;
  }

  // обновление названия задачи по id
  if (argv[0] === 'update' && !isNaN(argv[1]) && argv[2]) {
    try {
      tasksList.updateTitle(argv[1], argv[2]);
      getSuccessfulMessage(`Задача #${argv[1]} обновлена`);
    } catch {
      reportNotFound(argv[1]);
    }
    return;
  }

  // обновление статуса задачи по id
  if (argv[0] === 'status' && !isNaN(argv[1]) && argv[2]) {
    try {
      tasksList.updateStatus(argv[1], argv[2]);
      getSuccessfulMessage(`Статус задачи #${argv[1]} обновлен`);
    } catch {
      reportNotFound(argv[1]);
    }
    return;
  }

  // удаление задачи по id
  if (argv[0] === 'delete' && !isNaN(argv[1])) {
    try {
      tasksList.delete(argv[1]);
      getSuccessfulMessage(`Задача #${argv[1]} удалена`);
    } catch {
      reportNotFound(argv[1]);
    }
    return;
  }

  // если команды в списке не нашлось
  console.log(chalk.bgRed('Некорректная команда!'));
};
