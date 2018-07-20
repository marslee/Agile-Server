let path = require("path");
let router = require("koa-router")();
let Sequelize = require("sequelize");
let random = require("../../utils/lib/random");
let http = require("../../utils/lib/http");
let SMSClient = require('@alicloud/sms-sdk')

let daoUser = require('../../dao/user');

// 用户注册逻辑
// 1.是否发验证码，是否存在手机号？存在，更新验证码，不存在，插入验证码

router.post("/", async function (ctx, next) {

  let get = ctx.request.query;
  let post = ctx.request.body;

  // 拿到手机号
  let res_phone = await daoUser.list({
    phone: post.phone
  });

  let code = random();

  if (res_phone.count == 0) {
    await daoUser.add(
      {
        phone: post.phone,
        verify_code: code,
        verify_time: new Date()
      }
    );
  } else {
    await daoUser.update({
      verify_code: code,
      verify_time: new Date()
    }, {
        phone: post.phone
      });
  }

  const accessKeyId = 'LTAIylL1Od2ZnZzi'
  const secretAccessKey = '1MOktTyLwFI6qxbIChjYpOCJNb3MUQ'

  let smsClient = new SMSClient({ accessKeyId, secretAccessKey });

  //发送短信
  smsClient.sendSMS({
    PhoneNumbers: post.phone,
    SignName: '肥猫优生活',
    TemplateCode: 'SMS_134321227',
    TemplateParam: '{"code":"' + code + '"}'
  }).then(function (res) {

    let { Code } = res
    if (Code === 'OK') {
      console.log(res);
    }

  }, function (err) {
    console.log(err);
  });

  ctx.body = {
    code: 0,
    msg: '验证码发送成功',
    data: null
  };

});

module.exports = router.routes();