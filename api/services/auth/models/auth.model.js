import { pool } from '../../../config/connection.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
const SECRET_KEY = 'api';

export class AuthModel {

    constructor(){}

    async CheckUserByEmail({email}) {
        const sql = `SELECT * FROM users WHERE email LIKE ?`;
        const result = await pool.query(sql, [email]);
        if(!result[0][0]) return false;

        return result[0][0];
    }

    async CheckUserByUsername({username}) {
        const sql = `SELECT * FROM users WHERE username LIKE ?`;
        const result = await pool.query(sql, [username]);
        if(!result[0][0]) return false;

        return result[0][0];
    }

    async HashPassword({password}) {
        const hash = await bcrypt.hash(password, 11);
        return hash;
    }

    async ComparePassword({password, dbPassword}) {
        const compare = await bcrypt.compare(`${password}`, `${dbPassword}`);
        if(!compare) return false;

        return true
    }

    async GenerateJWT({id}) {
        const token = jwt.sign(
            { id: id },
            SECRET_KEY,
            {
                expiresIn: '3 day'
            }
        );
        return token;
    }

}

export const auth = new AuthModel();

