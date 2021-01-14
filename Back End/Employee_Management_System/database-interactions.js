const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'pi',
    password: 'raspberry', 
    database : 'employee_management_system',
    connectionLimit: 10
});

module.exports = {
    CreateProfile: async function (params) {

        console.log("in CreateProfile async function");
        let conn;
        console.log(params);

        try {
            console.log("awaiting connection");
            conn = await pool.getConnection();
            console.log("about to create user data");
            const userData = await conn.query(
                "START TRANSACTION;\n" + 
                //"DECLARE @userId int;\n" +
                //"DECLARE @accountID binary(16);\n" +
                "SET @accountID = UuidToBin(uuid());\n" +
                //"DECLARE @holidayID binary(16);\n" +
                "SET @holidayID = UuidToBin(uuid());\n" +
                "INSERT INTO user (name);\n" +
                "VALUES ('" + params.name + "');\n" +
                "SET @userId = LAST_INSERT_ID();\n" + 
                "INSERT INTO account (account_id, user_id, holiday_id, is_employee, is_manager, is_admin, salary);\n" +
                "VALUES (@accountID, @userId, @holidayID, " + params.roles.includes(0) + ", " + params.roles.includes(1) + ", " + params.roles.includes(2) + ", " + params.salary + ");\n" + 
                "INSERT INTO holiday (holiday_id, total_holidays, account_id));\n" +
                "VALUES (@holidayID, " + params.totalHolidays + ", @accountID);\n" + 
                "COMMIT;"
            );         
            console.log(userData);
            return userData;               
            
        } catch (err) {
            throw new Error(err);
        } finally {
            if (conn) conn.end();
        }
    },
    GetProfileData: async function (id) {
        console.log("in GetProfileData async function");
        let conn;

        try {
            console.log("awaiting connection");
            conn = await pool.getConnection();
            console.log("about to get user data");
            const userData = await conn.query(
                "SELECT u.user_id, u.name, UuidFromBin(acc.account_id) AS accountID, UuidFromBin(acc.holiday_id) AS holidayID, acc.salary, acc.is_employee, acc.is_manager, acc.is_admin, hol.total_holidays, hol.is_on_holiday, hol.holidays_left\n" + 
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

