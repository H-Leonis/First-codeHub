const Router = require('koa-router');

const momentRouter = new Router({prefix: '/moment'});

const { 
    verifyAuth,
    verifyPermission,
} = require('../middleware/auth.middleware');

const {
    create, 
    detail,
    list,
    updata,
    remove,
    addLabels,
    fileInfo
} = require('../controller/moment.controller.js');

const {
    verifyLableExists
} = require('../middleware/label.middleware')

// 创建动态
momentRouter.post('/', verifyAuth, create);
// 查看动态
momentRouter.get('/:momentId', detail);
momentRouter.get('/', list);
// 修改动态
momentRouter.patch('/:momentId', verifyAuth, verifyPermission, updata);
// 删除动态
momentRouter.delete('/:momentId', verifyAuth, verifyPermission, remove);
// 给动态添加标签
momentRouter.post('/:momentId/lables', verifyAuth, verifyPermission, verifyLableExists, addLabels);

// 获取动态图片
momentRouter.get('/images/:filename', fileInfo);

module.exports = momentRouter;