<!--
 * @Author: ltinerary
 * @Date: 2023-03-23 01:30:20
 * @LastEditTime: 2023-03-30 01:21:48
 * @LastEditors: ltinerary
 * @FilePath: /janet9527/README.md
 * @Description: 🎉🎉🎉
-->
# janet9527

# yml 脚本
```yml
name: janet-helper

on:
  schedule:
    - cron: "30 0 * * *" # 该时间为UTC时间，比北京时间晚8个小时，每天早上7点自动执行

jobs:
  send:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v1
      - name: Run Project
        run: npm install --registry=https://registry.npm.taobao.org && npm run server
```

```yml
name: janet(●'◡'●)

on:
  workflow_dispatch:
  schedule:
    - cron: '2 0 * * *'
    - cron: '12 9 * * *'

jobs:
  send:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 16
      - name: Time To Get Off Work
        if: github.event.schedule == '12 9 * * *'
        env:
          USER: ${{ secrets.USER }}
          EP: ${{ secrets.EP }}
        run: echo "🚁 Time To Get Off Work" && node tips.js ${USER} ${EP}
      - name: Daily Reminders
        if: github.event.schedule == '2 0 * * *'
        env:
          USER: ${{ secrets.USER }}
          EP: ${{ secrets.EP }}
          WK: ${{secrets.WK}}
        run: echo "🪂 Daily Reminders" && node index.js ${USER} ${EP} ${WK}
```

# 计划列表
1.随机图片（采用自己已定义好的图片，获取base64地址）todo done

2.邮件主题前的emjio 改成随机获取一个表情 todo done

3.增加今天吃什么 todo 优先级低

4.增加节日的信息展示？ todo [得找个稳定的查询节假日的接口]

5.重新设计邮件模板（mjml重写）优先级极低 https://mjml.io/
