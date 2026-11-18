const http = require('http');

const server = http.createServer((req, res) => {
    let response;
    let statusCode = 200;

    if (req.url === '/home') {
        response = 'Welcome home';
    } else if (req.url === '/about') {
        response = 'Welcome to About Us';
    } else if (req.url === '/node') {
        response = 'Welcome to my Node Js project';
    } else {
        response = 'Page Not Found';
        statusCode = 404;
    }

    res.writeHead(statusCode, {
        'Content-Type': 'text/html'
    });

    res.end(`<h1>${response}</h1>`);
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});