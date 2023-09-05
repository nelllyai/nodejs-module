import { getTasksFromFile, saveTasksIntoFile } from './fileUpdate.js';

class Tasks {
  constructor() {
    this._tasks = [];
    this._homedir = false;
  }

  // запись задач из файла в массив
  async init() {
    this._tasks = await getTasksFromFile(this._homedir);
  }

  // получение массива задач
  get list() {
    return this._tasks;
  }

  // задание флага обработки домашней директории
  set homedir(value) {
    this._homedir = value;
  }

  // добавление задачи и запись в файл
  add(title) {
    const newItem = {
      id: (this._tasks.at(-1)?.id || 0) + 1,
      title,
      status: 'В работе',
    };

    this._tasks.push(newItem);

    saveTasksIntoFile(this._tasks, this._homedir);
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

    saveTasksIntoFile(this._tasks, this._homedir);
  }

  // обновление статуса задачи по id и обновление файла
  updateStatus(id, status) {
    const taskIndexToEditStatus = this._tasks.findIndex(
      task => task.id === +id,
    );

    if (taskIndexToEditStatus !== -1) {
      this._tasks[taskIndexToEditStatus] = {
        ...this._tasks[taskIndexToEditStatus],
        status,
      };
    } else {
      throw new Error();
    }

    saveTasksIntoFile(this._tasks, this._homedir);
  }

  // удаление задачи по id и обновление файла
  delete(id) {
    if (this._tasks.find(task => task.id === +id)) {
      this._tasks = this._tasks.filter(task => task.id !== +id);
    } else {
      throw new Error();
    }

    saveTasksIntoFile(this._tasks, this._homedir);
  }
}

export const tasksList = new Tasks();
