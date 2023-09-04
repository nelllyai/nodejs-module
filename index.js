#!/usr/bin/env node

import { handleCommand } from './modules/handleCommand.js';
import { tasksList } from './modules/tasks.js';

const app = async () => {
  // инициализация списка из файла
  await tasksList.init();
  handleCommand(process.argv);
};

app();
