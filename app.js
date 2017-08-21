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
      this.body = '需要认证哦';
    } else {
      throw err;
    }
  }
});
app.use(auth({ name: 'zhang', pass: 'zhzhang' }));
app.use(serve('./public', {
  maxage: 1000 * 60 * 60 * 24 * 1, // 1天，默认为0
  hidden: false, // 能否返回隐藏文件（以`.`打头），默认false不返回
  index: 'index.html', // 默认文件名
  gzip: true
  // 允许传输gzip，如静态文件夹下有两个文件，index.js和index.js.gz，
  // 会优先传输index.js.gz，默认开启
}));
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
