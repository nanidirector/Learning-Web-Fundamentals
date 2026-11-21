
const http = require('http');
const fs = require('fs');   
const server = http.createServer((req, res) => {

    console.log('Request received:', req.method, req.url);

    if (req.url === '/') {

        res.setHeader('Content-Type', 'text/html');

        res.end(`
            <form action="/message" method="POST">
                <label>Name</label>
                <input type="text" name="username">
                <button type="submit">Submit</button>
            </form>
        `);

    } 
    
    else if (req.url === '/message' && req.method === 'POST') {

        const datachunk = [];

        req.on('data', (chunk) => {
            console.log('Buffer:', chunk);
            datachunk.push(chunk);
        });

        req.on('end', () => {
            let combinedData = Buffer.concat(datachunk);
            console.log('combinedData:', combinedData.toString());
            let value =combinedData.toString().split('=')[1];
            console.log('value:', value); 
            fs.writeFile('message.txt',value,(err)=>{
            res.statusCode =302;
            res.setHeader('Location', '/');
        })
        });
        

    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page Not Found');
    }

});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
