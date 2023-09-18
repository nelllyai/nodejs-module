import 'dotenv/config';
import { default as Knex } from 'knex';

const DB = 'todos';

const knex = Knex({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
});

// получить список задач
export const getTasksList = async () => {
  const list = await knex(DB);
  knex.destroy();
  return list;
};

// добавить задачу
export const addTask = async title => {
  await knex(DB).insert({ title, status: 'В работе' });
  const maxArray = await knex(DB).max('id');
  knex.destroy();
  return maxArray[0].max;
};

// получить информацию о задаче по id
export const getTaskById = async id => {
  const [task] = await knex(DB).where({ id });
  knex.destroy();
  return `
        Задача #${task.id}
        Название: ${task.title}
        Статус: ${task.status}
    `;
};

// обновить название задачи по id
export const updateTaskTitleById = async (id, title) => {
  await knex(DB).where({ id }).update({ title });
  knex.destroy();
};

// обновить статус задачи по id
export const updateTaskStatusById = async (id, status) => {
  await knex(DB).where({ id }).update({ status });
  knex.destroy();
};

// удалить задачу по id
export const deleteTaskById = async id => {
  await knex(DB).where({ id }).del();
  knex.destroy();
};
