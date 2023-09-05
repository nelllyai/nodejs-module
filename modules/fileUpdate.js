import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const FILE = './tasks.json';
const HOMEDIR_FILE = path.join(os.homedir(), 'tasks.json');

// запись задач в .json
export const saveTasksIntoFile = (list, toHomedir) => {
  const filePath = toHomedir ? HOMEDIR_FILE : FILE;
  fs.writeFileSync(filePath, JSON.stringify(list));
};

// получение массива задач из файла
export const getTasksFromFile = async fromHomedir => {
  const filePath = fromHomedir ? HOMEDIR_FILE : FILE;

  // создать файл при отсутствии
  try {
    fs.accessSync(filePath);
  } catch {
    fs.writeFileSync(filePath, JSON.stringify([]));
  }

  const json = fs.readFileSync(filePath).toString();
  return JSON.parse(json);
};
