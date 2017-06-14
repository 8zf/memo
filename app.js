let serve = require('koa-static');
let koa = require('koa');
let mongo = require('koa-mongo');
let Router = require('koa-router');
let app = new koa();


let router = new Router();
app.use(serve('./public'));
app.use(mongo({
    host: 'localhost',
    port: 27017,
    db: 'memo'
}));

router
    //show all notes
    .get('/notes', async (ctx, next) => {
            ctx.body = "this is fucking body";
            // let content = await ctx.mongo.db('note').collection('note').insert({name: "zhangfeng"});
            let content = await ctx.mongo.db('note').collection('note').find().toArray();
            console.log(content);
        }
    )
    //insert note
    .post('/notes', async (ctx, next) => {

    })
    //update note
    .post('/note/:id', async (ctx, next) => {

    });

app
    .use(router.routes())
    .use(router.allowedMethods());
app.listen(3000);

console.log('服务器监听端口：3000');