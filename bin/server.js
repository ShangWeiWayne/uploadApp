// 创建一个名为 bin 的新目录，将其作为包含 server.js 文件的目录的子目录。
var http = require('http');
 http.createServer(function(req,res) {
   res.writeHead(200, {'Content-Type': 'text/html'});
   res.end('Hello from Azure running node version: ' + process.version + '</br>');
 }).listen(process.env.PORT || 3000);
