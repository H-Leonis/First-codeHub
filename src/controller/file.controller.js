const FileService = require('../service/file.service')
const UserService = require('../service/user.service')
const { APP_HOST, APP_PORT } = require('../app/config');

class FileController {
    async saveAvatarInfo(ctx, next) {
        const { filename, mimetype, size } = ctx.req.file;
        const { id } = ctx.user;
        // 保存头像信息
        const result = await FileService.createAvatar(filename, mimetype, size, id);
        // 保存信息到用户表中
        const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`;
        await UserService.updateAvatarUrlById(avatarUrl, id);
        ctx.body = {
            statusCode: 200,
            message: {
                result: '用户上传图片成功'
            }
        }
    }

    async savePictureInfo(ctx, next) {
        const files = ctx.req.files;
        const { id } = ctx.user;
        const { momentId } = ctx.query;
        // 保存数据
        for (let file of files) {
            const { filename, mimetype, size } = file;
            await FileService.createFile(filename, mimetype, size, id, momentId);
        }
        ctx.body = {
            statusCode: 200,
            message: {
                result: '动态配图上传成功'
            }
        }
    }
}

module.exports = new FileController();