const fs = require('fs');

/* const userRoutes = (app) => {
    fs.readdirSync(__dirname).forEach(file => {
        if (file === 'index.js') return;
        const router = require(`./${file}`);
        app.use(router.routes());
        app.use(router.allowedMethods());
    })
}; */


// 隐式this绑定

const userRoutes = function () {
    fs.readdirSync(__dirname).forEach(file => {
        if (file === 'index.js') return;
        const router = require(`./${file}`);
        this.use(router.routes());
        this.use(router.allowedMethods());
    })
}



module.exports = userRoutes;