import { pool } from '../../../config/connection.js';

class PostModel {
    async CreateFile({file}) {
        const sqlFile = 'INSERT INTO files(fullname,extname) VALUES (?,?)';
        const resultFile = await pool.query(sqlFile, [file.fullname, file.extname]);
        return resultFile;
    }

    async CreatePost({post}) {
        const sqlPost = 'INSERT INTO post(creathe_id, file_id, content) VALUES(?,?,?)';
        await pool.query(sqlPost, [post.creathe_id, post.file_id, post.content]);
    }

    async CreateFileAndPost({file, post}) {
        const fileResult = await this.CreateFile({file});
        post.file_id = fileResult[0].insertId;
        await this.CreatePost({post});
    }

    async GetAllPostById({id}) {
        const sqlFind = 'SELECT * FROM post JOIN files ON(post.file_id = files.id) WHERE post.creathe_id = ?';
        const result = await pool.query(sqlFind, [id]);
        console.log(result);
        return result;
    }
}

const post = new PostModel();

export default post;
