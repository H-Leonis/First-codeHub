const connection = require('../app/database');

class UserService {
    async create(user) {
        const { username, password } = user;
        const statement = `insert into users (name, password) values (?, ?);`;
        const result = await connection.execute(statement, [username, password]);
        return result[0];
    }

    async getUsersByName(name) {
        const statement = `select * from users where name = ?`;
        const result = await connection.execute(statement, [name]);
        return result[0];
    }

    async updateAvatarUrlById(avatarUrl, userId) {
        const statement = `update users set avatar_url = ? where id = ?`;
        const [result] = await connection.execute(statement, [avatarUrl, userId]);
        return result[0];
    }
};




module.exports = new UserService();
