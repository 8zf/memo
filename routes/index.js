const router = require('koa-router')();
const objectid = require('objectid');
const multer = require('koa-multer');
const upload = multer({dest: 'public/uploads/'});
const asyncBusboy = require('async-busboy');
const fs = require('fs');
const path = require('path');
//const uploadToQiniu = require('./../qiniu/index2.js');

router
// 首页
  .get('/', async (ctx, next) => {
    ctx.type = 'html';
    ctx.body = fs.createReadStream(path.resolve(__dirname + './../public/index.html'))
  })
  .post('/upload', upload.single('note_image'), async (ctx, next) => {
    const {originalname, path, mimetype} = ctx.req.file;
    console.log(originalname);
    console.log(path);
    console.log(mimetype);
    let rs = fs.createReadStream(path);
    let ws = fs.createWriteStream('public/uploads/' + originalname);
    try {
      //pipe到本地文件
      rs.pipe(ws);
      //let res = await uploadToQiniu('public/uploads/', originalname);
      //console.log(res);
      ctx.body = {
        status: "success",
        filepath: "/uploads/" + originalname
      };
    }
    catch (e) {
      ctx.body = {
        status: "failed",
        result: e
      };
      console.log(e);
    }
  })
//delete a note
  .post('/note/delete/:id', async (ctx, next) => {
    let id = ctx.params.id;
    console.log(id);
    let result = await ctx.mongo.db('note').collection('note').remove({"_id": objectid(id)});
    console.log(result);
    ctx.body = result;
  })
//update a note
  .post('/note/update/:id', async (ctx, next) => {
    const {files, fields} = await asyncBusboy(ctx.req);
    let new_content = fields;
    if(new_content.images) {
      if (new_content.images !== "") {
        new_content.images = new_content.images.split(',');
      }
      else if (new_content.images === "") {
        new_content.images = [];
      }
    }
    let id = ctx.params.id;
    let result = await ctx.mongo.db('note').collection('note').update({"_id": objectid(id)}, {$set: new_content}, {});
    ctx.body = result;
  })
//show all notes
  .get('/note', async (ctx, next) => {
    if (!ctx.query.seq && !ctx.query.month) {
      // 这里要兼容旧的时间格式
      // 不需要，实际上创建时间倒序就是raw data倒序
      let body = await ctx.mongo.db('note').collection('note').find().toArray();
      body.sort((a, b) => {return dateFormatter(b.createdAt) - dateFormatter(a.createdAt)})
      //body.forEach(note => {
      //console.log(note.createdAt)
      //})
      // 在这里进行排序
      ctx.body = body
      //ctx.body = body.reverse()
    }
    else if (ctx.query.seq){
      // 每次6个
      console.log(ctx.query.seq * 2)
      ctx.body = await ctx.mongo.db('note').collection('note').find().skip(ctx.query.seq * 2).limit(2).sort({createdAt: -1}).toArray();
    }
    else if (ctx.query.month) {
      // 按月份分类
    }
  })
  .get('/note/:id', async (ctx, next) => {
    let id = ctx.params.id;
    console.log(id);
    let result = await ctx.mongo.db('note').collection('note').find({"_id": objectid(id)}).toArray();
    console.log(result);
    ctx.body = result;
  })
//create a note
  .post('/note', async (ctx, next) => {
    const {files, fields} = await asyncBusboy(ctx.req);
    let new_note = fields;
    if (new_note.images !== "") {
      new_note.images = new_note.images.split(',');
    }
    else if (new_note.images === "") {
      new_note.images = [];
    }
    let result = await ctx.mongo.db('note').collection('note').insert(new_note);
    console.log("note inserted");
    console.log(new_note);
    //console.log(result);
    ctx.body = result;
  });

let dateFormatter = date_string => {
  //console.log(date_string)
  let date = new Date(date_string)
  if (date == 'Invalid Date') {
    let reg = /([0-9]{4})\/([0-9]{1,2})\/([0-9]{1,2}) ([\u4e0b|\u4e0a])\u5348([0-9]{1,2})\:([0-9]{1,2})\:([0-9]{1,2})/g
    //使用正则表达式匹配字符串
    let res = reg.exec(date_string)
    //console.log(res)
    if (res[4] === '下') {
      res[5] = parseInt(res[5]) + 12
    }
    //console.log(res)
    let new_date = new Date(res[1], parseInt(res[2])-1, res[3], res[5], res[6], res[7])
    //console.log(Date.parse(new_date))
    return Date.parse(new_date)
  } else {
    //console.log(Date.parse(date_string))
    return Date.parse(date_string)
  }
}

module.exports = router;
