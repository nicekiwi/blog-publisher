import Router from 'koa-router'
import passport from 'koa-passport';
import auth from '../controllers/auth'
import posts from '../controllers/posts'
import tags from '../controllers/tags'

const router = new Router()
const authenticate = passport.authenticate('jwt', { session: false })

// Routes
router.get('/posts', authenticate, posts.all)
router.get('/post/:id', authenticate, posts.fetch)
router.post('/posts/create', authenticate, posts.create)
router.post('/posts/update/:id', authenticate, posts.update)
router.post('/posts/remove/:id', authenticate, posts.remove)

router.get('/tags', tags.all)

// Auth
router.post('/ping', authenticate, auth.handlePing)
router.post('/token-refresh', authenticate, auth.handleTokenRefresh)
router.post('/logout', authenticate, auth.handleLogout)
router.post('/login', auth.handleLogin)

export default router