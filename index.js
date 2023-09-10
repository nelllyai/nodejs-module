#!/usr/bin/env node

import chalk from 'chalk';
import fetchNews from './modules/fetchNews.js';
import parseArgs from './modules/parseArgs.js';
import printNews from './modules/printNews.js';

const app = async () => {
  try {
    const options = parseArgs(process.argv);
    const news = await fetchNews(options);
    printNews(news);
  } catch (error) {
    console.log(chalk.bgRed(error.message));
  }
};

app();
