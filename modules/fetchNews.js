import https from 'node:https';
// import url from 'node:url';

const fetchNews = (options = {}) => {
  const apiKey = '65f79928ed794be897e5e09178bdcf8d';

  const newsUrl = new URL('https://newsapi.org/v2/top-headlines');

  if (options.q) {
    newsUrl.searchParams.append('q', options.q);
  }

  if (options.l) {
    newsUrl.searchParams.append('country', options.l);
  } else {
    newsUrl.searchParams.append('country', 'us');
  }

  if (options.c) {
    newsUrl.searchParams.append('category', options.c);
  }

  if (options.s) {
    newsUrl.searchParams.append('pageSize', options.s);
  } else {
    newsUrl.searchParams.append('pageSize', 10);
  }

  newsUrl.searchParams.append('apiKey', apiKey);

  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=utf-8',
      'User-Agent': 'NewsApp/1.0',
    },
  };

  return new Promise((resolve, reject) => {
    try {
      const request = https.request(newsUrl, requestOptions, response => {
        let data = '';

        response.on('data', chunk => {
          data += chunk;
        });

        response.on('end', () => {
          resolve(JSON.parse(data).articles);
        });
      });

      request.end();
    } catch (error) {
      reject(error);
    }
  });
};

export default fetchNews;
