import chalk from 'chalk';

const printNews = news => {
  if (news.length) {
    news.forEach(({ title, author, description, publishedAt, url }, index) => {
      if (index) console.log();
      console.log(chalk.bgBlack(index + 1 + '.'));
      console.log(chalk.bgCyan(chalk.bold(title) + ` / ${author}`));
      console.log(
        `Дата публикации: ${new Date(publishedAt).toLocaleDateString('ru-RU')}`,
      );
      if (description) {
        console.log(chalk.italic(description));
      }
      console.log(`Источник: ${url}`);
    });
  } else {
    console.log(chalk.bgYellow('Такие новости не найдены'));
  }
};

export default printNews;
