import chalk from 'chalk';
import { readTasksFile } from './fileUpdate.js';
import { tasksList } from './tasks.js';

export const handleCommand = ([, , ...argv]) => {
  const reportNotFound = id => {
    console.log(chalk.red(`Задача #${id} не найдена!`));
  };

  const getSuccessfulMessage = text => {
    console.log(chalk.green(text));
  };

  // добавление задачи
  if (argv[0] === 'add' && argv[1]) {
    const newTaskId = tasksList.add(argv[1]);
    getSuccessfulMessage(`Задача #${newTaskId} добавлена`);
    return;
  }

  // вывод списка из файла
  if (argv[0] === 'list') {
    console.log(chalk.bgGreen('Список задач:'));
    console.log(readTasksFile());
    return;
  }

  // получение описания задачи по id
  if (argv[0] === 'get' && argv[1] && !isNaN(argv[1])) {
    try {
      getSuccessfulMessage(tasksList.getById(argv[1]));
    } catch {
      reportNotFound(argv[1]);
    }
    return;
  }

  // обновление названия задачи по id
  if (argv[0] === 'update' && argv[1] && !isNaN(argv[1]) && argv[2]) {
    try {
      tasksList.updateTitle(argv[1], argv[2]);
      getSuccessfulMessage(`Задача #${argv[1]} обновлена`);
    } catch {
      reportNotFound(argv[1]);
    }
    return;
  }

  // обновление статуса задачи по id
  if (argv[0] === 'status' && argv[1] && !isNaN(argv[1]) && argv[2]) {
    try {
      tasksList.updateStatus(argv[1], argv[2]);
      getSuccessfulMessage(`Статус задачи #${argv[1]} обновлен`);
    } catch {
      reportNotFound(argv[1]);
    }
    return;
  }

  // удаление задачи по id
  if (argv[0] === 'delete' && argv[1] && !isNaN(argv[1])) {
    tasksList.delete(argv[1]);
    getSuccessfulMessage(`Задача #${argv[1]} удалена`);
    return;
  }

  // если команды в списке не нашлось
  console.log(chalk.bgRed('Некорректная команда!'));
};
