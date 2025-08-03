const {
  scryptSync,
  createCipheriv,
  createDecipheriv,
  createHmac,
  generateKeyPairSync,
} = require('node:crypto')
const { Buffer } = require('node:buffer')

class CryptoServices {

  generateRSAkeys() {
    const { privateKey, publicKey } = generateKeyPairSync('rsa', {
      modulusLength: 2048,
    });
    return { privateKey, publicKey }
  }

  encryptData(data, password) {
    const algorithm = process.env.ENCRYPTION_ALGORITHM
    const key = scryptSync(password, 'salt', 24)
    if (!key) throw 'encryptData: An error occured scryptSync'
    const iv = Buffer.alloc(16, 0)
    if (!iv) throw 'encryptData: An error occured randomFillSync'
    const cipher = createCipheriv(algorithm, key, iv);

    let encryptedData = cipher.update(data, 'utf8', 'hex')
    encryptedData += cipher.final('hex')
    return encryptedData
  }

  decryptData(encryptedData, password) {
    const algorithm = process.env.ENCRYPTION_ALGORITHM
    const key = scryptSync(password, 'salt', 24)
    const iv = Buffer.alloc(16, 0)
    const decipher = createDecipheriv(algorithm, key, iv)
    try {
      let decryptedData = decipher.update(encryptedData, 'hex', 'utf8')
      decryptedData += decipher.final('utf8')
      return decryptedData
    }
    catch (err) {
      console.log('decryptData:', err)
      return 0
    }
  }

  hashData = (data) => {
    const algorithm = process.env.HASH_ALGORITHM
    const secret = process.env.HASH_SECRET
    const hmac = createHmac(algorithm, secret)
    hmac.update(data);
    return hmac.digest('hex')
  }


  isHashValid = (hashedData, data) => {
    const newHash = this.hashData(data)
    if(hashedData === newHash) return true
    return false
  }

}


module.exports = new CryptoServices()