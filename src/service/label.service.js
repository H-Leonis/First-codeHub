const connection = require('../app/database');

class LabelSeravice {
    async create(name) {
        const stateament = `insert into label (name) values (?);`;
        const [result] = await connection.execute(stateament, [name]);
        return result;
    }

    async getLabelByName(name) {
        const stateament = `select * from label where name = ?;`;
        const [result] = await connection.execute(stateament, [name]);
        return result[0];
    }

    async list(limit, size) {
        const stateament = `select * from label limit ?, ?;`;
        const [result] = await connection.execute(stateament, [limit, size]);
        return result;
    }

}

module.exports = new LabelSeravice();