const fs = require('fs');

const MomentService = require('../service/moment.service');
const FileService = require('../service/file.service');
const { PICTURE_PATH } = require('../constants/file-path');

class MomentController {
    async create(ctx, next) {
        // 获取数据
        const userId = ctx.user.id;
        const content = ctx.request.body.content;
        const result = MomentService.create(userId, content);
        ctx.body = result;
    };

    async detail(ctx, next) {
        const { momentId } = ctx.params;
        const result = await MomentService.getMomentById(momentId);
        ctx.body = result;
    };

    async list(ctx, next) {
        const { offset, size } = ctx.query;
        const result = await MomentService.getMomentList(offset, size);
        ctx.body = result;
    }

    async updata(ctx, next) {
        const { momentId } = ctx.params;
        const { content } = ctx.request.body;
        const result = MomentService.updata(content, momentId);
        ctx.body = result;
    }

    async remove(ctx, next) {
        const { momentId } = ctx.params
        const result = await MomentService.remove(momentId);
        ctx.body = result;
    }

    async addLabels(ctx, next) {
        const { labels } = ctx;
        const { momentId } = ctx.params;
        for (let label of labels) {
            const isExist = await MomentService.hasLabel(momentId, label.id);
            if (!isExist) {
                await MomentService.addLabel(momentId, label.id);
            }
        }
        ctx.body = '给动态添加标签成功';
    }

    async fileInfo(ctx, next) {
        let { filename } = ctx.params;
        const fileInfo = await FileService.getFileByFilename(filename);
        const { type } = ctx.query;
        const types = ['small', 'middle', 'large'];
        if (types.some(item => item === type)) {
            filename = filename + '-' +type;
        }
        ctx.response.set('content-type', fileInfo.mimetype);
        ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`);
    }
};




module.exports = new MomentController();