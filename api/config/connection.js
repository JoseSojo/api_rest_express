import mysql from 'mysql2/promise';

/**
 * Connection MYSQL
 */
const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    database:'api_pinterest',
    password:''
});

/**
 * TEST MYSQL 'SELECT NOW()'
 */
const Test = async () => {
    try {
        const sql = 'SELECT NOW()';
        await pool.query(sql);
        console.log('        _> MYSQL RUNNING')

    } catch (error) {
        console.error('FAILED MYSQL')
        console.log(error);
    }
}

export { pool, Test }
