const http = require('http');

//headers to allows CORS requests
const headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10
};

const port = 3000;

// TODO: Fill with strings of your favorite quotes :) ====== DONE
const quotes = [
  'I am always doing that which I cannot do, in order that I may learn how to do it.',
  'The affect you have on others is the most valuable currency there is.',
  'Success is not final, failure is not fatal, it is the courage to continue that counts.',
  'It is not death that a man should fear, but he should fear never beginning to live.',
  'Ninety-nine percent of the failures come from people who have the habit of making excuses.'
];

//Utility Function to return a random integer
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

const handleRequest = function(req, res) {
  console.log(`Endpoint: ${req.url} Method: ${req.method}`);

  // redirect users to /quote if they try to hit the homepage. This should already work, no changes needed
  if (req.url == '/') {
    console.log('redirecting');
    res.writeHead(301, {...headers, Location: `http://localhost:${port}/quote`}) //redirect to quote
    res.end();
  }

  // TODO: GET ONE
  if ((req.url == '/quote/' || req.url == '/quote') && req.method == "GET") {
    //YOUR CODE HERE
    res.writeHead(200, {...headers});
    index = getRandomInt(0, quotes.length);
    res.end(`${quotes[index]}`);
  }
  // TODO: POST/CREATE
  else if ((req.url == '/quote/' || req.url == '/quote') && req.method == "POST") {
    //YOUR CODE HERE
    res.writeHead(200, {...headers});
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
    });
    req.on('end', () => {
        console.log(body);
        quotes.push(body);
        console.log('quotesArray:', quotes)
        res.end(body);
    });
  }

//CATCH ALL ROUTE
  else {
    res.writeHead(404,headers);
    res.end('Page not found');
  }
}

const server = http.createServer(handleRequest);
server.listen(port);

console.log('Server is running in the terminal!');
console.log(`Listening on http://localhost:${port}`);
