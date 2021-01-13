const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'pi',
    password: 'raspberry', 
    database : 'employee_management_system',
    connectionLimit: 10
});

module.exports = {
    GetProfileData: async function (id) {
        console.log("in GetProfileData async function");
        let conn;

        try {
            console.log("awaiting connection");
            conn = await pool.getConnection();
            console.log("about to get user data");
            const userData = await conn.query(
                "SELECT u.user_id, UuidFromBin(acc.account_id) AS accountID, UuidFromBin(acc.holiday_id) AS holidayID, acc.salary, acc.is_employee, acc.is_manager, hol.total_holidays, hol.is_on_holiday, hol.holidays_left\n" + 
                "FROM user AS u\n" + 
                "INNER JOIN account AS acc ON " + id + " = acc.user_id\n" +
                "INNER JOIN holiday AS hol ON hol.account_id = acc.account_id;"
            );            
            userData[0].accountID = userData[0].accountID.toString('utf8');
            userData[0].holidayID = userData[0].holidayID.toString('utf8');
            console.log(userData);
          
            return userData[0];
            
        } catch (err) {
            throw new Error(err);
        } finally {
            if (conn) conn.end();
        }
    }
}

