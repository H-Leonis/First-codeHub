const errorTypes = require('../constants/error-types');
const userService = require('../service/user.service');
const md5password = require('../utils/password-handle');

// 检查用户信息
const verifyUser = async (ctx, next) => {
    // 获取用户名和密码
    const { username, password} = ctx.request.body;
    // 判断是否为空
    if (!username || !password) {
        const error = new Error(errorTypes.USERNAME_OR_PASSWORD_IS_REQUIRED);
        return ctx.app.emit('Error', error, ctx);
    }
    // 判断用户名是否被注册过
    const result = await userService.getUsersByName(username);
    if (result.length) {
        const error = new Error(errorTypes.USERNAME_ALREADY_EXITS);
        return ctx.app.emit('Error', error, ctx);
    }
    await next();
};

// 加密用户密码
const handlePassword = async (ctx, next) => {
    const { password } = ctx.request.body;
    ctx.request.body.password = md5password(password)

    await next();
}






module.exports = {
    verifyUser,
    handlePassword
};