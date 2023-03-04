const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const errorHandler = require('./error-handle');
const userRoutes = require('../router');

const app = new Koa();

app.userRoutes = userRoutes; //  *
app.use(bodyParser());
//userRoutes(app);
app.userRoutes();   // * 隐式this绑定，美观
app.on('Error', errorHandler);


module.exports = app;