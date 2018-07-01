const qiniu = require('qiniu');
const promisify = require("es6-promisify");
const path = require("path");

let accessKey = '31ULV4j3DA9p76IcvH3ZC3PrIgqXIh3EX8VMpvmD';
let secretKey = 'n_aGzUV1G3XdCXLc2abMD62IKS9ZDvKf7fFr_Mtt';
let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
let bucket = "memo";
let options = {
  scope: bucket,
  returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}'
};
let putPolicy = new qiniu.rs.PutPolicy(options);
let uploadToken=putPolicy.uploadToken(mac);
var config = new qiniu.conf.Config();
// 空间对应的机房
config.zone = qiniu.zone.Zone_z2;
// 是否使用https域名
//config.useHttpsDomain = true;
// 上传是否使用cdn加速
//config.useCdnDomain = true;

let localFile = "./public/uploads/2014-06-30 122430.jpg";
let formUploader = new qiniu.form_up.FormUploader(config);
let putExtra = new qiniu.form_up.PutExtra();
let key="shit.png";
// 文件上传
/*formUploader.putFile(uploadToken, key, localFile, putExtra, function(respErr,*/
//respBody, respInfo) {
//if (respErr) {
//throw respErr;
//}
//if (respInfo.statusCode == 200) {
//console.log(respBody);
//} else {
//console.log(respInfo.statusCode);
//console.log(respBody);
//}
/*});*/

function uploadToQiniu(filePath, fileName, cb){
  formUploader.putFile(uploadToken, fileName, filePath, putExtra, cb);
}

let utq = promisify(uploadToQiniu, {multiArgs: true});
utq(localFile, key).then((result) => {
  console.log(result);
}).catch((e) => {console.log(e)});

