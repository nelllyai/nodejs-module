import fs from 'node:fs';

const FILE = './tasks.json';

// запись задач в json
export const writeTasksIntoFile = list => {
  console.log(list);
  fs.writeFileSync(FILE, JSON.stringify(list));
};

// получение массива задач из файла
export const getTasksFromFile = async () => {
  // создать файл при отсутствии
  try {
    fs.accessSync(FILE);
  } catch {
    fs.writeFileSync(FILE, JSON.stringify([]));
  }

  const json = fs.readFileSync(FILE).toString();
  return JSON.parse(json);
};
