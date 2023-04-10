// 產生隨機字元的函式
const All_Char = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

module.exports = function (amount) {
  let results = ''
  for (let i = 0; i < amount; i++) {
    let index = Math.floor(Math.random() * All_Char.length)
    results += All_Char[index]
  }
  return results
}