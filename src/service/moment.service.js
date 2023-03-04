const connection = require('../app/database');

const sqlFragment = `
    select 
        m.id, m.content, m.creaetAt createTime, m.updateAt updataTime,
        json_object('id', u.id, 'name', u.name) user
    from moment m
    left join users u on m.user_id = u.id
`

class MomentService {
    async create(userId, content) {
        const statement = `insert into moment (content, user_id) value (?, ?);`;
        const [result] = await connection.execute(statement, [content, userId]);
        return result;
    };

    async getMomentById(id) {
        const statement = `
        select
            m.id, m.content, m.createAt createTime, m.updateAt updataTime,
            json_object('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url) auther,

            if (count(l.id), json_arrayagg(
                json_object('id', l.id, 'name', l.name)
            ), NUll) labels,

                (select if (count(c.id), json_arrayagg(
                    json_object('id', c.id, 'content', c.content, 'commentId', c.comment_id, 'createAt', c.createAt, 'updateAt', c.updateAt,
                    'user', json_object('id', cu.id, 'name', cu.name, 'avatarUrl', cu.avatar_url))), NULL)
                    from comment c
                    left join users cu on c.user_id = cu.id
                    where m.id = c.moment_id) comments,
                (select json_arrayagg(
                    concat('http://localhost:8888/moment/images/', file.filename)) 
                    from file where m.id = file.moment_id) images
        from moment m
        left join users u on m.user_id = u.id
        left join moment_label ml on m.id = ml.moment_id
        left join label l on ml.label_id = l.id
        where m.id = ?
        group by m.id;
        `;
        const [result] = await connection.execute(statement, [id]);
        return result[0];
    };

    async getMomentList(offset, size) {
        const statement = `
        select
            m.id, m.content, m.createAt createTime, m.updateAt updataTime,
            json_object('id', u.id, 'name', u.name) user,
            (select count(*) from comment c where c.moment_id = m.id) commentCount,
            (select count(*) from moment_label ml where ml.moment_id = m.id) labelCount,
            (select json_arrayagg(
                concat('http://localhost:8888/moment/images/', file.filename)) 
                from file where m.id = file.moment_id) images
        from moment m
        left join users u on m.user_id = u.id
        limit ?,?;
        `;
        const [result] = await connection.execute(statement, [offset, size]);
        return result;
    }

    async updata(content, momentId) {
        const statement = `update moment set content = ? where id = ?;`;
        const [result] = await connection.execute(statement, [content, momentId]);
        return result;
    }

    async remove(momentId) {
        const statement = `delete from moment where id = ?;`;
        const [result] = await connection.execute(statement, [momentId]);
        return result;
    }

    async hasLabel(momentId, labelId) {
        const stateament = `select * from moment_label where moment_id = ? and label_id = ?;`;
        const [result] = await connection.execute(stateament, [momentId, labelId]);
        return result[0] ? true : false;
    }

    async addLabel(momentId, labelId) {
        const stateament = `insert into moment_label (moment_id, label_id) values (?, ?);`;
        const [result] = await connection.execute(stateament, [momentId, labelId]);
        return result;
    }
}

module.exports = new MomentService();