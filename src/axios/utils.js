let CryptoJS = require('crypto-js')

let key = CryptoJS.enc.Utf8.parse('1qazxsw23edcvfr4')


// 加密
export function EncryptData (data) {
  console.log('加密', JSON.stringify(data))
  let srcs = CryptoJS.enc.Utf8.parse(JSON.stringify(data))
  let encrypted = CryptoJS.AES.encrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString()
}

// 解密
export function DecryptData (data) {
  let decrypt = CryptoJS.AES.decrypt(data, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  let result = CryptoJS.enc.Utf8.stringify(decrypt).toString()
  console.log('解密', result)
  return result
}

