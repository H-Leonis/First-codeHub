const connection = require('../app/database');

class AuthService {
    async checkResource(tableName, commentId, userId) {
        try {
            const statement = `select * from ${tableName} where id = ? and user_id = ?;`;
            const [result] = await connection.execute(statement, [commentId, userId]);
            return result.length === 0 ? false : true;
        } catch (error) {
            console.log(error);
        }
    }




}


module.exports = new AuthService();