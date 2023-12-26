import { pool } from '../../../config/connection.js';
import {AuthModel} from './auth.model.js';

class LoginModel extends AuthModel {
    
    async UpdateDateSession({id}) {
        const sql = "UPDATE users SET `last_login` = NOW(), `session_active` = '1' WHERE id = ?";
        const up = await pool.query(sql, [id]);
        return up;
    }

}

const login = new LoginModel();

export default login;
