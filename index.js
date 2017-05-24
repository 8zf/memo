var serve = require('koa-static');
var koa = require('koa');
var app = new koa();

// $ GET /package.json
app.use(serve('./public'));

// $ GET /hello.txt


app.listen(3000);

console.log('listening on port 3000');