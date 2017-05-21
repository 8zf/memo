const Koa = require('koa');
const app = new Koa();

// response
app.use(ctx => {
    ctx.body = '你好啊，这里是张锋的memo';
});

app.listen(3000);