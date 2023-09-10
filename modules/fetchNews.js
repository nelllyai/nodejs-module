import https from 'node:https';
import 'dotenv/config';

const fetchNews = (options = {}) => {
  const newsUrl = new URL(process.env.NEWS_URL);

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

  newsUrl.searchParams.append('apiKey', process.env.API_KEY);

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
