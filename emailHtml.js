/*
 * @Author: fanjf
 * @Date: 2023-03-22 14:38:36
 * @LastEditTime: 2023-03-25 05:21:42
 * @LastEditors: ltinerary
 * @FilePath: /janet9527/emailHtml.js
 * @Description: 🎉🎉🎉
 */
function fn(weatherData, lifeData, word, imgurl, lovingDays) {
  const { daily: weatherDataDaily } = weatherData;
  const { daily } = lifeData;
  // const createData = ()
  let txHtml = [];//生活指数
  daily.forEach(ele => {
    txHtml.push(`
  <li style="margin-bottom: 10px">
              ${ele.name}(${ele.category}):
              ${ele.text}
            </li>`)
  })

  let dayWether = [];//3天的预报
  let indexList = ['今天', '明天', '后天']
  weatherDataDaily.forEach((ele, index) => {
    dayWether.push(`
    <p>
    <b>${ele.fxDate}:</b><br/>
    <b>${index < 3 ? indexList[index] : ''}【${ele.textDay}】:</b>
    <span>${ele.tempMin}°C - ${ele.tempMax}°C</span>
  </p>
    `)
  })
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    <body>
      <div>
        <!-- 天数 -->
        <div>
          <p>今天是在一起的第<span style="font-weight:bold">${lovingDays}</span>天！</p>
        </div>
        <!-- 图片 -->
        <div>
          <img
            style="width: 100%; max-width: 768px"
            src="${imgurl}"
            alt="图片"
          />
        </div>
        <!-- 每日一句 -->
        <div>
          <p style="font-size: 14px; text-indent: 2em; font-style: italic;">
            ${word}
          </p>
        </div>
        <!-- 天气 -->
        <div>
        <b>嘉兴天气：</b>
          ${dayWether.join("")}
          <p>
        </p>
          <ul>
          ${txHtml.join("")}
          </ul>
        </div>
      </div>
    </body>
  </html>
  `;
}

module.exports = fn;
