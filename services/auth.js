import bcrypt from 'bcrypt-node'
import passport from 'koa-passport'
import { Strategy } from 'passport-jwt'

const jwtSecret = process.env.JWT_SECRET || 'secret'
const adminUsername = process.env.ADMIN_USERNAME || 'admin'

const jwtStrategy = new Strategy({
    secretOrKey: jwtSecret,
    jwtFromRequest: req => req && req.cookies ? req.cookies.get('jwt'): null
}, (payload, done) => done(null, payload.username === adminUsername ? payload: false))

passport.use(jwtStrategy)

export default passport