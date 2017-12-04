
export default {
    async fetch(ctx) {
        ctx.body = await ctx.state.db.get('tags').value()
    }
}
