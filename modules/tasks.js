import {
  appendTasksFile,
  getTasksArrayFromFile,
  writeTasksFile,
} from './fileUpdate.js';

class Tasks {
  constructor() {
    this._tasks = [];
  }

  // запись задач из файла в массив
  async init() {
    this._tasks = await getTasksArrayFromFile();
  }

  // добавление задачи и запись в файл
  add(title) {
    const newItem = {
      id: (this._tasks.at(-1)?.id || 0) + 1,
      title,
      status: 'В работе',
    };

    appendTasksFile(newItem);
    return newItem.id;
  }

  // получение форматированной строки с информацией о задаче
  getById(id) {
    const task = this._tasks.find(task => task.id === +id);

    return `
        Задача #${task.id}
        Название: ${task.title}
        Статус: ${task.status}
      `;
  }

  // обновление описания задачи по id и обновление файла
  updateTitle(id, title) {
    this._tasks[+id - 1] = {
      ...this._tasks[+id - 1],
      title,
    };

    writeTasksFile(this._tasks);
  }

  // обновление статуса задачи по id и обновление файла
  updateStatus(id, status) {
    this._tasks[+id - 1] = {
      ...this._tasks[+id - 1],
      status,
    };

    writeTasksFile(this._tasks);
  }

  // удаление задачи по id и обновление файла
  delete(id) {
    this._tasks = this._tasks.filter(task => task.id !== +id);

    writeTasksFile(this._tasks);
  }
}

export const tasksList = new Tasks();
