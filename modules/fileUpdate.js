import fs from 'node:fs';
import readline from 'readline';

const FILE = './tasks.txt';

// запись в конец файла
export const appendTasksFile = ({ id, title, status }) => {
  fs.appendFileSync(FILE, `${id}. [${status}] ${title}\n`);
};

// полное обновление файла с записью задач из массива
export const writeTasksFile = list => {
  fs.writeFileSync(FILE, '');
  for (const item of list) {
    appendTasksFile(item);
  }
};

// получение массива задач из файла
export const getTasksArrayFromFile = async () => {
  // создать файл при отсутствии
  try {
    fs.accessSync(FILE);
  } catch {
    fs.writeFileSync(FILE, '');
  }

  const tasks = [];

  const rl = readline.createInterface({
    input: fs.createReadStream(FILE),
  });

  for await (const line of rl) {
    const id = +/^\d+/.exec(line)?.[0];

    if (id) {
      const status = /\[.*\]/.exec(line)?.[0].slice(1, -1);
      const title = /\]\s.*$/.exec(line)?.[0].slice(2);

      const newTask = {
        id,
        status,
        title,
      };

      tasks.push(newTask);
    }
  }

  return tasks;
};

// получение информации из файла
export const readTasksFile = () => fs.readFileSync(FILE).toString();
