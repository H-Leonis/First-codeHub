const LabelSeravice = require('../service/label.service');

const verifyLableExists = async (ctx, next) => {
    const { labels } = ctx.request.body;
    const newLabels = [];
    for (let name of labels) {
        const lableResult = await LabelSeravice.getLabelByName(name);
        const label = { name };
        if (!lableResult) {
            const result = await LabelSeravice.create(name);
            label.id = result.insertId;
        } else {
            label.id = lableResult.id
        }
        newLabels.push(label);
    }
    ctx.labels = newLabels;
    await next();
}

module.exports = {
    verifyLableExists
};