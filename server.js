// let express = require("express");
// let server = express();
// server.use(express.static("public"));
// server.listen(process.env.PORT || 8000);

let http = require("http");
let fs = require("fs");
let server = http.createServer((req, res)=>{
    if (req.url=="/"){
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(fs.readFileSync("index.html"));
    } else if (req.url=="/stylesheet/main.css"){
        res.writeHead(200, {"Content-Type": "text/css"});
        res.end(fs.readFileSync("stylesheet/main.css"));
    } else if (req.url=="/main.js"){
        res.writeHead(200, {"Content-Type": "text/js"});
        res.end(fs.readFileSync("main.js"));
    }
});
server.listen(process.env.PORT || 8000);