const qiniu = require("qiniu");
const randomize = require('randomatic');
const promisify = require("es6-promisify");
const path = require("path");

//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = '31ULV4j3DA9p76IcvH3ZC3PrIgqXIh3EX8VMpvmD';
qiniu.conf.SECRET_KEY = 'n_aGzUV1G3XdCXLc2abMD62IKS9ZDvKf7fFr_Mtt';

//要上传的空间
bucket = 'memo';

//上传到七牛后保存的文件名
key = randomize('*', 3) + '.png';

//构建上传策略函数，设置回调的url以及需要回调给业务服务器的数据
function uptoken(bucket, key) {
  var putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key);
  // putPolicy.callbackUrl = 'http://your.domain.com/callback';
  // putPolicy.callbackBody = 'filename=$(fname)&filesize=$(fsize)';
  return putPolicy.token();
}

//生成上传 Token
token = uptoken(bucket, key);

//要上传文件的本地路径
//filedir = path.resolve(__dirname, './../public/uploads');

//构造上传函数
function uploadFile(localFile, callback) {
  var extra = new qiniu.io.PutExtra();
  qiniu.io.putFile(uptoken, key, localFile, extra, callback);
}
let uploadToQiniu = promisify(uploadFile);
module.exports = uploadToQiniu;
