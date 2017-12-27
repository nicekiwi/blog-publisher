import shortid from 'shortid';
import lodash from 'lodash';

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

        let body = ctx.request.body
        //let tags = body.tags.replace(' ', '').split(',')

        let post = { 
            id: shortid.generate(), 
            title: body.title, 
            content: body.content//,
           // tags: tags
        }

        // try {
        //     let tags = await ctx.state.db.get('tags').value()

        //     if(tags)

        // } catch(e) {

        // }

        try {
            await ctx.state.db.get('posts').push(post).write()
            ctx.body = { success: true, response: 'Post Created.', data: post }
            ctx.status = 200
        } catch(e) {
            ctx.body = { success: false, response: 'Post could not be created.', debug: e }
            ctx.status = 400
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
