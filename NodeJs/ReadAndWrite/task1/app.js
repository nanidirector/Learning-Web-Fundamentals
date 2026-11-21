
const http = require('http');
const routeHandler = require('./routes');
const server = http.createServer(routeHandler);

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
