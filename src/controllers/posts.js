
import lowdb from 'lowdb'
import AwsStorage from 'lowdb-adapter-aws-s3'

const adapter = new AwsAdapter('db.json', { 
    defaultValue: {
        posts: [], tags: []
    },
    aws: {
        
    }
 })

export default {
    fetch(ctx) {

    }
}
