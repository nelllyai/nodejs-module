import http from 'http';
import https from 'https';
import url from 'url';

const fetchData = urlString => {
  const parsedUrl = url.parse(urlString);
  const httpModule = parsedUrl.protocol === 'https' ? https : http;

  const options = {
    hostname: parsedUrl.hostname,
    port: parsedUrl.port,
    path: parsedUrl.path,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'User-Agent': 'HttpApp/1.0',
    },
  };

  return new Promise((resolve, reject) => {
    try {
      const request = httpModule.request(options, response => {
        let data = '';

        response.on('data', chunk => {
          data += chunk;
        });

        response.on('end', () => {
          resolve(data);
        });
      });

      request.end();
    } catch (error) {
      reject(error);
    }
  });
};

export default fetchData;
