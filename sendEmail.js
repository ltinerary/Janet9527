/*
 * @Author: ltinerary
 * @Date: 2023-03-23 01:30:20
 * @LastEditTime: 2023-03-28 02:40:53
 * @LastEditors: ltinerary
 * @FilePath: /janet9527/sendEmail.js
 * @Description: 🎉🎉🎉
 */
const nodemailer = require('nodemailer');

const sendMail = async (data,config) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: '465',
    secureConnection: true,
    auth: {
      user:config.user,
      pass:config.ep,
    }
  });

  data.from = `"${data.from}" ${config.user}`;

  await transporter.sendMail(data);
};

module.exports = sendMail;