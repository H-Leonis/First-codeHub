const CommentService = require('../service/comment.service');


class CommentController {
    async create(ctx, next) {
        const { momentId, content } = ctx.request.body;
        const { id } = ctx.user;
        const result = await CommentService.create(momentId, content, id);
        ctx.body = result;
    }

    async reply(ctx, next) {
        const { momentId, content } = ctx.request.body;
        const { commentId } = ctx.params;
        const { id } = ctx.user;
        const result = await CommentService.reply(momentId, content, id, commentId);
        ctx.body = result;
    }

    async updata(ctx, next) {
        const { commentId } = ctx.params;
        const { content } = ctx.request.body;
        const result = await CommentService.updata(commentId, content);
        ctx.body = result;
    }

    async remove(ctx, next) {
        const { commentId } = ctx.params;
        const result = await CommentService.remove(commentId);
        ctx.body = result;
    }

    async list(ctx,next) {
        const { momentId } = ctx.query;
        const result = await CommentService.getCommentsByMomentId(momentId);
        ctx.body = result;
    }
}


module.exports = new CommentController();