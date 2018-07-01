let CronJob = require('cron').CronJob;
//Seconds: 0-59
//Minutes: 0-59
//Hours: 0-23
//Day of Month: 1-31
//Months: 0-11
//Day of Week: 0-6
//let's make it every hour
new CronJob('0 30 * * * *', function() {
  console.log('You will see this message every hour');
  console.log(new Date())
  //删除非图片文件
}, null, true, 'America/Los_Angeles');
