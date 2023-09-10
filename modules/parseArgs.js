const parseArgs = ([, , ...argv]) => {
  const args = {};

  for (let i = 0; i < argv.length - 1; i += 2) {
    if (argv[i].startsWith('-') && argv[i + 1]) {
      args[argv[i].substring(1)] = argv[i + 1];
    } else {
      throw new Error('Некорректная команда!');
    }
  }

  return args;
};

export default parseArgs;
