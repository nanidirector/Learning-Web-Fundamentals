
const http = require("http");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "message");

const server = http.createServer((req, res) => {

    // TASK 1 & 2: Display form and previous messages
    if (req.url === "/" && req.method === "GET") {

        fs.readFile(filePath, "utf8", (err, data) => {

            let messages = [];

            if (!err && data) {
                messages = data.split("\n").filter(Boolean);
            }

            // Prevent HTML injection
            const escapeHTML = (str) =>
                str.replace(/[&<>"']/g, (char) => ({
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#39;"
                })[char]);

            const messageHTML = messages.map(message =>
                `<li>${escapeHTML(message)}</li>`
            ).join("");

            res.setHeader("Content-Type", "text/html");

            res.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Message App</title>
                </head>
                <body>

                    <h1>Messages</h1>

                    <ul>
                        ${messageHTML}
                    </ul>

                    <h2>Add a New Message</h2>

                    <form action="/" method="POST">
                        <input
                            type="text"
                            name="message"
                            placeholder="Enter your message"
                            required
                        />
                        <button type="submit">Send</button>
                    </form>

                </body>
                </html>
            `);

            res.end();
        });
    }

    // TASK 1 & 2: Receive and write submitted message
    else if (req.url === "/" && req.method === "POST") {

        const body = [];

        // Receive incoming data chunks
        req.on("data", (chunk) => {
            body.push(chunk);
        });

        // Execute after all chunks are received
        req.on("end", () => {

            const parsedBody = Buffer.concat(body).toString();

            const params = new URLSearchParams(parsedBody);

            const message = params.get("message")?.trim();

            if (!message) {
                res.writeHead(400, {
                    "Content-Type": "text/plain"
                });
                res.end("Message cannot be empty");
                return;
            }

            // Read existing messages
            fs.readFile(filePath, "utf8", (err, data) => {

                if (err && err.code !== "ENOENT") {
                    res.writeHead(500);
                    res.end("Error reading file");
                    return;
                }

                const oldMessages = data || "";

                // Put the newest message at the top
                const updatedMessages =
                    message + "\n" + oldMessages;

                // Write updated content into the file
                fs.writeFile(filePath, updatedMessages, (err) => {

                    if (err) {
                        res.writeHead(500);
                        res.end("Error writing file");
                        return;
                    }

                    // Redirect using HTTP 302
                    res.writeHead(302, {
                        Location: "/"
                    });

                    res.end();
                });
            });
        });
    }

    else {
        res.writeHead(404, {
            "Content-Type": "text/plain"
        });
        res.end("Page Not Found");
    }

});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
