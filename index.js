import fetchData from './modules/fetchData.js';
import parseHtml from './modules/parseHTML.js';

const app = async () => {
  const result = await fetchData('http://www.lexxdomain.com/episodes.php');
  console.log('HTML:');
  console.log(result);

  console.log();
  parseHtml(result);
};

app();
