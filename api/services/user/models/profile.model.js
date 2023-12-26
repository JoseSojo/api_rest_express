import { pool } from '../../../config/connection.js';

class ProfileModel {
    async ValidUserById({id}) {
        const userResult = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
        return userResult[0][0];
    }

    async ComparePassword({password, dbPassword}) {
        return await bcrypt.compare(`${password}`, `${dbPassword}`);
    }

    async UpdateUserById({ user, id }) {
        console.log(user);
        console.log(id);
        const sql = 'UPDATE `users` SET ? WHERE id = ?';
        await pool.query(sql, [user, id]);
        await pool.query("UPDATE `users` SET `update_user` = NOW() WHERE id = ?", [id]);
    }

    async GetAllUserById({id}) {
        const sqlUser = 'SELECT * FROM users WHERE id = ?';
        const sqlProfile = 'SELECT * FROM profile WHERE user_id = ?';

        const resultUser = pool.query(sqlUser, [id]);
        const resultProfile = pool.query(sqlProfile, [id]);

        const user = await resultUser;
        const profile = await resultProfile;

        return { user:user[0][0],profile: profile[0][0] }
    }

    async SetVisite({ id }) {
        const sql = 'UPDATE profile SET visites=(SELECT visites FROM profile WHERE id = ?)+1 WHERE id = ?';
        await pool.query(sql, [id, id]);
    }
}

const profile = new ProfileModel();

export default profile;
