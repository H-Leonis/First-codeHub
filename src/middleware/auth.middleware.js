const jwt = require('jsonwebtoken');

const userService = require('../service/user.service');
const AuthService = require('../service/auth.service');
const errorTypes = require('../constants/error-types');
const md5password = require('../utils/password-handle');
const { PUBLIC_KEY } = require('../app/config');


const verifyLogin = async (ctx, next) => {
    // 获取用户名和密码
    const { username, password } = ctx.request.body;
    // 判断用户名和密码是否为空
    if (!username || !password) {
        const error = new Error(errorTypes.USERNAME_OR_PASSWORD_IS_REQUIRED);
        return ctx.app.emit('Error', error, ctx);
    }

    // 判断用户是否存在
    const result = await userService.getUsersByName(username);
    const user = result[0];
    if (!user) {
        const error = new Error(errorTypes.USER_DOES_NOT_EXISTS);
        return ctx.app.emit('Error', error, ctx);
    }

    // 判断用户名和密码是否和数据库一致 
    if (md5password(password) !== user.password) {
        const error = new Error(errorTypes.PASSWORD_IS_INCORRENT);
        return ctx.app.emit('Error', error, ctx);
    }

    ctx.user = user;
    await next();

};

const verifyAuth = async (ctx, next) => {
    // 获取token
    const authorization = ctx.headers.authorization;
    if (!authorization) {
        const error = new Error(errorTypes.UNAUTHORIZATION);
        return ctx.app.emit('Error', error, ctx);
    }
    const token = authorization.replace('Bearer ', '');

    // 验证token(id/name/iot/exp)
    try {
        const result = jwt.verify(token, PUBLIC_KEY, {
            algorithms: ["RS256"]
        });
        ctx.user = result;
        await next();
    } catch (err) {
        const error = new Error(errorTypes.UNAUTHORIZATION);
        ctx.app.emit('Error', error, ctx);
    }
}

const verifyPermission = async (ctx, next) => {
    const [resourceKey] = Object.keys(ctx.params);
    const tableName = resourceKey.replace('Id', '');
    const resourceId = ctx.params[resourceKey];
    const { id } = ctx.user;
    try {
        const isPermission = await AuthService.checkResource(tableName, resourceId, id);
        if (!isPermission) throw new Error();
        await next();
    } catch (err) {
        const error = new Error(errorTypes.UNPERMISSION);
        return ctx.app.emit('Error', error, ctx);
    }
};


// 思路一
/* const verifyPermission = (tableName) => {
    return async (ctx, next) => {
        const { momentId } = ctx.params;
        const { id } = ctx.user;
        try {
            const isPermission = await AuthService.checkResource(tableName, momentId, id);
            if (!isPermission) throw new Error();
            await next();
        } catch (err) {
            const error = new Error(errorTypes.UNPERMISSION);
            return ctx.app.emit('Error', error, ctx);
        }
    }
} */



    module.exports = {
        verifyLogin,
        verifyAuth,
        verifyPermission
    };