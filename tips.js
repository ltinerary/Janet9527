/*
 * @Author: fanjf
 * @Date: 2023-03-22 16:09:10
 * @LastEditTime: 2023-03-30 01:24:31
 * @LastEditors: ltinerary
 * @FilePath: /janet9527/tips.js
 * @Description: 🌽 下班提醒的邮件信息
 */
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

const sendEmail = require('./sendEmail');
const { getEmjoi } = require('./tools')
// 给dayjs添加时区选项
dayjs.extend(utc);
dayjs.extend(timezone);

const {
    fromDisplayText,
    masterAccount,
    to,
} = require('./config');

async function init() {
    const [user, ep] = process.argv.slice(2);
    try {
        to.forEach(p => {
            if (p !== masterAccount) {
                console.log(`🐳 发送给【${p}】邮件`)
                sendEmail({
                    from: fromDisplayText,
                    to: p,
                    subject: ` ${getEmjoi()} ${dayjs(`${new Date()}`).format('YYYY年MM月DD日')}下班提醒`,
                    html: `
           <h1>🌅 下班很匆忙，也别错过黄昏跟夕阳。</h1>
           <h1>🔌 记得拔插座！</h1>
           <h1>🔌 记得拔插座！</h1>
           <h1>🔌 记得拔插座！</h1>
          `,
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
            subject: `${getEmjoi()} 【${dayjs(`${new Date()}`).format('YYYY年MM月DD日')}】下班提醒报错`,
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
