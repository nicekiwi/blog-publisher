import bcrypt from 'bcrypt-node'
import jwt from 'jsonwebtoken'

const admin = {
    username: process.env.ADMIN_USERNAME || 'admin',
    password: process.env.ADMIN_PASSWORD || bcrypt.hashSync('secret')
}

const AuthController = {

  generateToken: payload => {
    return jwt.sign(payload, process.env.JWT_SECRET || 'secret');
  },

  generateTokenCookie: (ctx, username, rememberMe) => {

    let tokenLifespan = 900000; // 15 Minutes

    // Setup remember me
    if(rememberMe) tokenLifespan = 604800000; // 7 Days

    const tokenExpiresDate = Date.now() + tokenLifespan;

    const token = AuthController.generateToken({
        username,
        exp: tokenExpiresDate,
        iat: Date.now()
    });

    ctx.cookies.set('jwt', token, {
        maxAge: tokenLifespan,
        expires: new Date(tokenExpiresDate),
        httpOnly: true,
        overwrite: true,
        path: '/'
    })

    return tokenExpiresDate;
  },

  handleLogout: ctx => {

    ctx.cookies.set('jwt', '', {
        maxAge: 1,
        expires: new Date(1),
        httpOnly: true,
        overwrite: true,
        path: '/'
    })

    ctx.status = 200
    ctx.body = 'OK'
  },

  handleLogin: async ctx => {

    const body = ctx.request.body;

    if(body.username === admin.username && bcrypt.compareSync(body.password, admin.password)) {
        ctx.status = 200;
        ctx.body = {
            tokenExpires: AuthController.generateTokenCookie(ctx, body.username, body.rememberMe),
            user: { username: body.username }
        }
    }
    else {
        ctx.status = 401;
        ctx.body = {
            message: "Incorrect Email and/or Password."
        }
    }
  },

    handleTokenRefresh: ctx => {
        ctx.status = 200;
        ctx.body = {
            tokenExpires: AuthController.generateTokenCookie(ctx, ctx.state.user.username, false)
        }
    },

    handlePing: async ctx => {
        if(ctx.state.user.username === admin.username) {
            ctx.status = 200
            ctx.body = {
                tokenExpires: ctx.state.user.exp,
                user: { username: admin.username }
            }
        } else {
            ctx.status = 401
            ctx.body = 'Nope.'
        }
    }
}

export default AuthController