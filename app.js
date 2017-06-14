const serve = require('koa-static');
const koa = require('koa');
const mongo = require('koa-mongo');
const router = require('./routes');
const auth = require('koa-basic-auth');
const cors = require('koa-cors');

const app = new koa();
// const upload = multer({ dest: 'uploads/' });
app.use(cors());
app.use(function *(next){
    try {
        yield next;
    } catch (err) {
        if (401 == err.status) {
            this.status = 401;
            this.set('WWW-Authenticate', 'Basic');
            this.body = 'cant haz that';
        } else {
            throw err;
        }
    }
});
// app.use(auth({ name: 'zhang', pass: 'zhzhang' }));
app.use(serve('./public'));
app.use(mongo({
    host: 'localhost',
    port: 27017,
    db: 'memo'
}));



app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);

console.log('服务器监听端口：3000');