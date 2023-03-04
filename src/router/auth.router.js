const Router = require('koa-router');

const authRouth = new Router();

const {
    login,   
} = require('../controller/auth.controller.js');
const {
    verifyLogin,
    verifyAuth
} = require('../middleware/auth.middleware');

authRouth.post('/login', verifyLogin, login);




module.exports = authRouth;