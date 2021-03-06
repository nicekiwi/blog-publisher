
import lowdb from 'lowdb'
import storage from '../../lowdb-adapter-aws-s3'
import crypto from 'crypto'

const algorithm = 'AES-256-CTR'
const password = process.env.ENCRYPT_PASSWORD || 'secret'

const encrypt = text => {
    let cipher = crypto.createCipher(algorithm,password)
    let crypted = cipher.update(text,'utf8','hex')
    crypted += cipher.final('hex')
    return crypted;
}
   
const decrypt = text => {
    let decipher = crypto.createDecipher(algorithm,password)
    let dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8')
    return dec;
}

const adapter = new storage('db.json', {
    //serialize: data => encrypt(JSON.stringify(data)),
    //deserialize: data => JSON.parse(decrypt(data)),
    aws: {
        bucketName: process.env.AWS_BUCKET_NAME
    }
})

export default lowdb(adapter)