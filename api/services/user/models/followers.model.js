import { pool } from '../../../config/connection.js';

class FollowModel {
    
    async FollowFollower({i,your}) {
        const success = 'SELECT * FROM follows WHERE i_id=? AND your_id=?';
        const resultSuccess = await pool.query(success, [i, your]) 

        if (resultSuccess[0][0]) {
            const deleteSQL = 'DELETE FROM follows WHERE i_id=? AND your_id=?';
            await pool.query(deleteSQL, [i, your]);
            return true
        }

        const sql = 'INSERT INTO follows(i_id, your_id) VALUES(?,?)';
        await pool.query(sql, [i, your]);
        
        const sqlProfile = 'UPDATE profile SET followers=(SELECT followers FROM profile WHERE id = ?)+1 WHERE id = ?';
        await pool.query(sqlProfile, [id, id]);
        return true
    }

}

const follow = new FollowModel();

export default follow;
