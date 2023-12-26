import mysql from 'mysql2/promise';

/**
 * Connection MYSQL
 */
const pool = mysql.createPool({
    host:'ep-mute-sun-39744424.ap-southeast-1.aws.neon.fl0.io',
    port:5432,
    user:'fl0user',
    database:'apipinterest',
    password:'xgbz3iHFJ6Bj'
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
