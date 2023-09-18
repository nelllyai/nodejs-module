#!/usr/bin/env node

import { handleCommand } from './modules/handleCommand.js';

const app = () => {
  handleCommand(process.argv);
};

app();
