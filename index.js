var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/app'));

app.listen(port);
console.log(`working on ${port}`);


// //Загрузка моделя HTTP
// const http = require("http");
// const hostname = '127.0.0.1';
// const port = process.env.PORT || 3000;

// //Создание HTTP-сервера
// const server = http.createServer((req, res) => {

//   //Установка HTTP-заголовков ответа с HTTP-статусом и Content type
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World\n');
// });

// //Слушание запросов на порту 3000, и в качестве каллбака функция, которая пишет в лог
// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });
