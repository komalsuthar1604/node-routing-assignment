const http = require("http"); 
const fs = require("fs"); 
const path = require("path"); // 1. FIXED: Imported the path module

const PORT = 8000; 

const myServer = http.createServer((req , res) => { 
    let filePath = ''; 
    
    if (req.url === '/' || req.url === '/home') {
        filePath = path.join(__dirname, 'home.html');
    } else if (req.url === '/about') {
        filePath = path.join(__dirname, 'about.html');
    } else if (req.url === '/contact') {
        filePath = path.join(__dirname, 'contact.html');
    } else if (req.url === '/style.css') {
        filePath = path.join(__dirname, 'style.css');
    } else {
        filePath = path.join(__dirname, '404not.html'); 
    }

    const ext = path.extname(filePath);
    let contentType = "text/html";
    if (ext === ".css") {
        contentType = "text/css";
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Internal Server Error");
            return;
        }

        if (filePath.includes("404not.html")) {
            res.writeHead(404, { "Content-Type": contentType });
        } else {
            res.writeHead(200, { "Content-Type": contentType });
        }

        res.end(data);
    }); 
});

myServer.listen(PORT , () => {
    console.log(`Server Started at port http://localhost:${PORT}`);
});