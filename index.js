/*
 * @Author: fanjf
 * @Date: 2023-03-22 16:09:10
 * @LastEditTime: 2023-03-30 01:16:08
 * @LastEditors: ltinerary
 * @FilePath: /janet9527/index.js
 * @Description: 🎉🎉🎉
 */
const fetch = require('node-fetch');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

const sendEmail = require('./sendEmail');
const emailHtml = require('./emailHtml');
const { getEmjoi, getRandom, getImgeName } = require('./tools')
// 给dayjs添加时区选项
dayjs.extend(utc);
dayjs.extend(timezone);

const {
  fromDisplayText,
  masterAccount,
  to,
  location,
  type,
  startDay,
  imgs,
  moneyRange,
  marryDay
} = require('./config');

async function init() {
  const [user, ep, wk] = process.argv.slice(2);
  try {
    // 获取天气信息
    const weatherRes = await fetch(
      `https://devapi.qweather.com/v7/weather/3d?key=${wk}&location=${location}`
    );
    const weatherData = await weatherRes.json();
    weatherData.daily.forEach(ele => {
      console.log(`🍔 ${ele.fxDate}【${ele.textDay}】:${ele.tempMin}°C - ${ele.tempMax}°C`)
    })
    // 获取天气生活指数
    const lifeRes = await fetch(
      `https://devapi.qweather.com/v7/indices/1d?key=${wk}&location=${location}&type=${type}`
    );
    const lifeData = await lifeRes.json();


    // // 获取one一个文案及图片
    // const oneRes = await fetch(
    //   `http://api.tianapi.com/txapi/one/index?key=${tianXingKey}`
    // );
    // const oneData = await oneRes.json();
    // const { word, imgurl } = oneData.newslist[0];
    const money = getRandom(moneyRange[0], moneyRange[1]);
    const moneyRate = Math.random();
    const word = `【约会基金】：范方出资 ${(money * moneyRate).toFixed(2)} 元，钱方出资 ${(money * (1 - moneyRate)).toFixed(2)} 元，共 ${money} 元。`;
    console.log(`🥩 此次约会基金===>[${word}]`)
    // 计算日期
    const lovingDays = dayjs(dayjs().tz('Asia/Shanghai')).diff(
      startDay,
      'days'
    );
    console.log('===🛩️ lovingDays===', lovingDays)

    const mD = dayjs(dayjs().tz('Asia/Shanghai')).diff(
      marryDay,
      'days'
    );
    console.log('===🥠 marryDays===', mD)
    // 用邮件模版生成字符串
    const htmlStr = emailHtml(weatherData, lifeData, word, lovingDays,mD);
    // 发送邮件; 本人的话一个月发一次邮件 定于每月12号发送邮件
    to.forEach(p => {
      if (p === masterAccount && dayjs().date() == 12) {
        console.log(`🫧 发送给【${p}】邮件`)
        sendEmail({
          from: fromDisplayText,
          to: p,
          subject: ` ${getEmjoi()} ${dayjs(`${new Date()}`).format('YYYY年MM月DD日')}提醒`,
          html: htmlStr,
        }, { user, ep });
      }
      if (p !== masterAccount) {
        console.log(`🐳 发送给【${p}】邮件`)
        sendEmail({
          from: fromDisplayText,
          to: p,
          subject: ` ${getEmjoi()} ${dayjs(`${new Date()}`).format('YYYY年MM月DD日')}提醒`,
          html: htmlStr,
        }, { user, ep });
      }
    })

  } catch (e) {
    // 发送邮件给自己提示
    console.log('-----------------🐞🐞🐞-----------------')
    console.log('错误名称', e?.name)
    console.log('错误信息', e?.message)
    console.log('错误堆栈', e?.stack)
    console.log('-----------------🐞🐞🐞-----------------')
    sendEmail({
      from: '报错啦',
      to: masterAccount,
      subject: `${getEmjoi()} 【${dayjs(`${new Date()}`).format('YYYY年MM月DD日')}】报错提醒`,
      html: `<h1>请查看github actions<h1>
      <a href="https://github.com/ltinerary/janet9527/actions">查看日志</a>
      <div>---------------------🐞Error Message----------------------</div>
      <h3>${e?.name}</h3>
      <p>${e?.message}</p>
      <p style="white-space:pre-wrap;">${e?.stack}</p>
      <div>---------------------🐞Error Message----------------------</div>
       <p>https://github.com/ltinerary/janet9527/actions</p>
      `,
    }, { user, ep });
  }
}

init();
