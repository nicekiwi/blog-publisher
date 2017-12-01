import passport from 'koa-passport';
import bcrypt from 'bcrypt-node';
import { Strategy as LocalStrategy } from 'passport-local';

const admin = {
    username: process.env.ADMIN_USERNAME || 'admin',
    password: process.env.ADMIN_PASSWORD || bcrypt.hashSync('secret')
}

const strategy = (username, password, done) => {

    if(username !== admin.username) {
        done(null, false);
    }

    if(username === admin.username && bcrypt.compareSync(password, admin.password)) {
        done(null, { id: 1 });
    }
};

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
    done(null, { id: 1 })
})

passport.use(new LocalStrategy(strategy));
