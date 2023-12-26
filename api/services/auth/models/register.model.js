import { pool } from '../../../config/connection.js';
import {AuthModel} from './auth.model.js';

class AuthRegisterModel extends AuthModel {
    
    constructor(){super()}

    async CreateProfile({user_id}) {
        const sql2 = 'INSERT INTO profile(user_id) VALUES (?)';
        await pool.query(sql2, [user_id]);
        return true
    }

    async CreateUser({username,email,password}) {
        const sql = 'INSERT INTO users(id,username,email,password) VALUES (NULL,?,?,?)';
        const user = await pool.query(sql, [username,email,password]);
        return user[0].insertId;
    }

}

console.log(AuthModel);
console.log(AuthRegisterModel);

const register = new AuthRegisterModel();

export default register;
