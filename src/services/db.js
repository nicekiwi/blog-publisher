
import lowdb from 'lowdb'
import storage from '../../../lowdb-adapter-aws-s3'

const adapter = new storage('db.json', { 
    aws: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_AECRET_ACCESS_KEY
    }
})

export default lowdb(adapter)