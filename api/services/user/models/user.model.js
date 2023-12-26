import { pool } from '../../../config/connection.js';

class UserModel {
    async GetPost({ id, count }) {
        const sql = 'SELECT * FROM post WHERE creathe_id = ?';
        const result = await pool.query(sql, id);

        if (count) {
            const sqlCount = 'SELECT COUNT(creathe_id) as quantity FROM post WHERE creathe_id = ?';
            const count = await pool.query(sqlCount, id);
            console.log(result[0]);
            return { post:result[0], count:count[0][0].quantity  }
        }

        return {post:result[0], count:null};
    }

    async GetFollow({ id, count }) {
        const sql = 'SELECT * FROM follows WHERE i_id = ?';
        const result = await pool.query(sql, id);

        if (count) {
            const sqlCount = 'SELECT COUNT(i_id) as quantity FROM follows WHERE i_id = ?';
            const count = await pool.query(sqlCount, id)
            return { follow:result[0], count:count[0][0].quantity  }
        }

        return {follow:result[0], count:null};
    }

    async GetFollower({ id, count }) {
        const sql = 'SELECT * FROM follows WHERE your_id = ?';
        const result = await pool.query(sql, id);

        if (count) {
            const sqlCount = 'SELECT COUNT(i_id) as quantity FROM follows WHERE your_id = ?';
            const count = await pool.query(sqlCount, id)
            return { followers:result[0], count:count[0][0].quantity  }
        }

        return {followers:result[0], count:null};
    }

    async IncrementOneFollow({ id }) {
        const sql = 'UPDATE profile SET follow=(SELECT follow FROM profile WHERE user_id = ? LIMIT 1)+1 WHERE user_id = ?';
        await pool.query(sql, [id, id]);
        const follow = await this.GetFollow();
        return follow.count;
    }

    async IncrementOneFollow({ id }) {
        const sql = 'UPDATE profile SET followers=(SELECT followers FROM profile WHERE user_id = ? LIMIT 1)+1 WHERE user_id = ?';
        await pool.query(sql, [id, id]);
        const follower = await this.GetFollower();
        return follower.count;
    }
}

const user = new UserModel();

export default user;
