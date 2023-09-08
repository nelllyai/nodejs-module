const parseHtml = htmlString => {
  const headingRegexp = /<h([1-6])>.*?<\/h([1-6])>/gi;
  const anchorRegexp = /<a href="[^"]*" .*?>.*?<\/a>/gi;

  const headings = htmlString.match(headingRegexp);
  const anchors = htmlString.match(anchorRegexp);

  console.log('Заголовки:');

  if (headings !== null) {
    headings.forEach((heading, index) => {
      console.log(`${index + 1}. ${heading.slice(4, -5)}`);
    });
  } else {
    console.log('Заголовки не найдены');
  }

  console.log();
  console.log('Ссылки:');

  if (anchors !== null) {
    anchors.forEach((anchor, index) => {
      console.log(
        `${index + 1}. URL: ${anchor.match(/href="([^"]*)"/i)[1]} TEXT: ${
          anchor.match(/<a href="[^"]*" .*?>(.*)?<\/a>/i)[1]
        }`,
      );
    });
  } else {
    console.log('Ссылки не найдены');
  }
};

export default parseHtml;
