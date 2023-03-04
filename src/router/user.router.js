const Router = require('koa-router');
const userRouter = new Router({prefix: '/users'});
const {
    create
} = require('../controller/user.controller');

const {
    verifyUser,
    handlePassword
} = require('../middleware/user.middleware');

const {
    verifyAuth
} = require('../middleware/auth.middleware');

const {
    avatarInfo
} = require('../controller/user.controller');

userRouter.post('/', verifyUser, handlePassword, create);
// 获取头像
userRouter.get('/:userId/avatar', avatarInfo);



module.exports = userRouter;