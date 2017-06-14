const router = require('koa-router')();
const objectid = require('objectid');
const multer = require('koa-multer');
const upload = multer({dest: 'public/uploads/'});
const asyncBusboy = require('async-busboy');
const fs = require('fs');
const path = require('path');
router
    .post('/upload', upload.single('note_image'), async (ctx, next) => {
        const {originalname, path, mimetype} = ctx.req.file;
        console.log(originalname);
        console.log(path);
        console.log(mimetype);
        let rs = fs.createReadStream(path);
        let ws = fs.createWriteStream('public/uploads/' + originalname);
        try {
            rs.pipe(ws);
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
        // let content = await ctx.mongo.db('note').collection('note').find().toArray();
        ctx.body = await ctx.mongo.db('note').collection('note').find().toArray();
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
        console.log("note inserted");
        console.log(new_note);
        let result = await ctx.mongo.db('note').collection('note').insert(new_note);
        console.log(result);
        ctx.body = result;
    });

module.exports = router;
