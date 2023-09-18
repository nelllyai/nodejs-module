import {
  addTask,
  deleteTaskById,
  getTaskById,
  getTasksList,
  updateTaskStatusById,
  updateTaskTitleById,
} from './databaseModule.js';
import chalk from 'chalk';

export const handleCommand = async ([, , ...argv]) => {
  const getSuccessfulMessage = text => {
    console.log(chalk.green(text));
  };

  // добавление задачи
  if (argv[0] === 'add' && argv[1]) {
    const newTaskId = await addTask(argv[1]);
    getSuccessfulMessage(`Задача #${newTaskId} добавлена`);
    return;
  }

  // вывод списка задач
  if (argv[0] === 'list') {
    console.log(chalk.bgGreen('Список задач:'));
    const list = await getTasksList();
    list.forEach(item => {
      console.log(`${item.id}. [${item.status}] ${item.title}`);
    });
    return;
  }

  // получение описания задачи по id
  if (argv[0] === 'get' && !isNaN(argv[1])) {
    try {
      getSuccessfulMessage(await getTaskById(argv[1]));
    } catch {
      console.log(chalk.red(`Задача #${argv[1]} не найдена!`));
    }
    return;
  }

  // обновление названия задачи по id
  if (argv[0] === 'update' && !isNaN(argv[1]) && argv[2]) {
    await updateTaskTitleById(argv[1], argv[2]);
    getSuccessfulMessage(`Задача #${argv[1]} обновлена`);
    return;
  }

  // обновление статуса задачи по id
  if (argv[0] === 'status' && !isNaN(argv[1]) && argv[2]) {
    await updateTaskStatusById(argv[1], argv[2]);
    getSuccessfulMessage(`Статус задачи #${argv[1]} обновлен`);
    return;
  }

  // удаление задачи по id
  if (argv[0] === 'delete' && !isNaN(argv[1])) {
    await deleteTaskById(argv[1]);
    getSuccessfulMessage(`Задача #${argv[1]} удалена`);
    return;
  }

  // если команды в списке не нашлось
  console.log(chalk.bgRed('Некорректная команда!'));
};
