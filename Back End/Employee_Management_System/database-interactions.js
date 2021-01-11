const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'pi',
    password: 'raspberry',
    connectionLimit: 10
});

module.exports = {
    GetProfileData: async function (id) {
        let conn;

        try {
            conn = await pool.getConnection();
            const user = await conn.query("SELECT * FROM employee_management_system.user as u WHERE u.user_id =" + id);
            console.log(user);
            const userId = user[0].user_id;
            console.log(userId);
            
        } catch (err) {
            throw err;
        } finally {
            if (conn) return conn.end();
        }
    }
}

