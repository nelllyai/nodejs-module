import readline from 'node:readline/promises';
import process from 'node:process';
import fs from 'node:fs';
import chalk from 'chalk';

const questions = JSON.parse(fs.readFileSync('./question.json', 'utf-8'));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const write = str => {
  process.stdout.write(str);
};

const clear = () => {
  write('\x1Bc');
};

let currentQuestionIndex, correctAnswersCount;
currentQuestionIndex = correctAnswersCount = 0;

const correctAnswersIndexes = [];

const showProgress = () => {
  console.log(
    chalk.cyan(
      `Вопрос: ${
        currentQuestionIndex < questions.length
          ? currentQuestionIndex + 1
          : questions.length
      } / ${questions.length}`,
    ),
  );

  let i = 0;

  for (i; i < currentQuestionIndex; i++) {
    if (correctAnswersIndexes.includes(i)) {
      write('\x1b[42m \x1b[0m');
    } else {
      write('\x1b[41m \x1b[0m');
    }
  }

  for (let j = i + 1; j <= questions.length; j++) {
    write('\x1b[47m \x1b[0m');
  }

  console.log();
};

const showMessage = (message, color) => {
  showProgress();
  console.log(chalk.italic[color](message));
};

const showResults = () => {
  console.log(chalk.bgGreen('\nПоздравляю, мы закончили!'));
  console.log(
    'Правильных ответов: ' +
      chalk.underline(`${correctAnswersCount}/${questions.length}`),
  );
  rl.close();
};

function checkResults(answer) {
  const currentQuestion = questions[currentQuestionIndex];

  if (isNaN(answer) || answer < 0 || answer > currentQuestion.options.length) {
    showMessage('Ответ некорректный! Попробуйте еще раз.', 'yellow');
    askQuestion();
    return;
  }

  currentQuestionIndex++;

  if (+answer === currentQuestion.correctIndex + 1) {
    correctAnswersCount++;
    correctAnswersIndexes.push(currentQuestionIndex - 1);
    showMessage('Правильный ответ!', 'green');
  } else {
    showMessage('Неправильный ответ.', 'red');
  }

  if (currentQuestionIndex < questions.length) {
    askQuestion();
  } else {
    showResults();
  }
}

async function askQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  console.log(chalk.bold(`\n${currentQuestion.question}`));

  console.log('\nВарианты ответов:');

  currentQuestion.options.forEach((option, index) => {
    console.log(index + 1 + '. ' + option);
  });

  const answer = await rl.question('\x1b[35m\nВаш ответ: \x1b[0m');

  clear();

  checkResults(answer);
}

clear();
console.log('Привет! Сейчас я задам тебе несколько вопросов по JavaScript');
console.log(
  'Чтобы ответить на вопрос, введи номер варианта (число) и нажми Enter',
);
console.log(chalk.dim('Нажми Enter, чтобы начать'));

rl.once('line', () => {
  clear();

  showProgress();
  askQuestion();
});
