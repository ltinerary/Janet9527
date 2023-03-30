/*
 * @Author: ltinerary
 * @Date: 2023-03-27 07:00:59
 * @LastEditTime: 2023-03-27 08:16:11
 * @LastEditors: ltinerary
 * @FilePath: /janet9527/tools.js
 * @Description: 🎉🎉🎉
 */
const emjoiList = ['🤠', '🦒', '🦞', '🤩', '🍉', '🍓', '🐬', '🔔', '🎈', '✨', '📞', '🪸', '🏮', '🧱', '🍔', '🥩', '🍥', '🍨', '🧁', '🍰', '🍭', '🍒', '🌺', '🦢', '🍿', '🍑', '🍅', '🚕', '🚘', '🚖', '🚲', '🛵', '🚈', '🚊', '🛫', '🛰️', '🛸', '🚀', '🚁', '🚢', '🛟', '🌸', '🌶️', '🍄', '🏖️', '🏝️', '🫧', '🌈']
const emjoiLen = emjoiList.length;
const getRandom = (n, m) => {
    return Math.floor(Math.random() * (m - n + 1) + n)
}

const getEmjoi = () => {
    const index = getRandom(0, emjoiLen - 1);
    return emjoiList[index]
}

const getImgeName = (url)=>{
  return url.replace(/.+\./,"")
}
module.exports = {
    getEmjoi,
    getRandom,
    getImgeName
};