import shortid from 'shortid';

export default {

    all: async ctx => {
        try {
            ctx.status = 200
            ctx.body = await ctx.state.db.get('posts').value()
        } catch(e) {
            ctx.status = 400
            ctx.body = { success: false, response: 'Posts could not be requested.', debug: e }
        }
    },

    fetch: async ctx => {

        try {
            ctx.status = 200
            ctx.body = await ctx.state.db.get('posts').find({ id: ctx.params.id }).value()
        } catch(e) {
            ctx.status = 400
            ctx.body = { success: false, response: 'Post could not be requested.', debug: e }
        }
    },

    create: async ctx => {

        let post = { 
            id: shortid.generate(), 
            title: ctx.request.body.title, 
            content: ctx.request.body.content 
        }

        try {
            await ctx.state.db.get('posts').push(post).write()
            ctx.status = 200
            ctx.body = { success: true, response: 'Post Created.', data: post }
        } catch(e) {
            ctx.status = 400
            ctx.body = { success: false, response: 'Post could not be created.', debug: e }
        }
    },

    update: async ctx => {

        let post = {
            title: ctx.request.body.title, 
            content: ctx.request.body.content
        }

        try {
            await ctx.state.db.get('posts').find({ id: ctx.params.id }).assign(post).write()
            ctx.status = 200
            ctx.body = { success: true, response: 'Post Updated.' }
        } catch(e) {
            ctx.status = 400
            ctx.body = { success: false, response: 'Post could not be created.', debug: e }
        }
    },

    remove: async ctx => {
        try {
            await ctx.state.db.get('posts').remove({ id: ctx.params.id }).write()
            ctx.status = 200
            ctx.body = { success: true, response: 'Post Removed.' }
        } catch(e) {
            ctx.status = 400
            ctx.body = { success: false, response: 'Post could not be removed.', debug: e }
        }
    }
}
