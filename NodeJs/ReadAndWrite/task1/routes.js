
const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');

        res.end(`
            <form action="/message" method="POST">
                <label>Name</label>
                <input type="text" name="username">
                <button type="submit">Submit</button>
            </form>
        `);
    }

    else if (url === '/message' && method === 'POST') {
        const datachunk = [];

        req.on('data', (chunk) => {
            datachunk.push(chunk);
        });

        req.on('end', () => {
            const combinedData = Buffer.concat(datachunk);
            const value = combinedData.toString().split('=')[1];

            fs.writeFile('message.txt', value, (err) => {
                if (err) {
                    console.log(err);
                    res.statusCode = 500;
                    res.end('File writing failed');
                    return;
                }

                res.statusCode = 302;
                res.setHeader('Location', '/');
                res.end(); // IMPORTANT: Ends the response
            });
        });
    }

    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page Not Found');
    }
};

module.exports = requestHandler;
