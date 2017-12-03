
import db from '../services/db';

export default {
    async fetch(ctx) {

        await db;

        ctx.body = await db.get('posts').value()
    }
}
