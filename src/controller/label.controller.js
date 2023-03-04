const labelService = require('../service/label.service')

class LabelContraller {
    async create(ctx, next) {
        const { name } = ctx.request.body;
        const result = await labelService.create(name);
        ctx.body = result;
    }

    async list(ctx, name) {
        const { limit, size } = ctx.query
        const result = await labelService.list(limit, size);
        ctx.body = result;
    }
}

module.exports = new LabelContraller();