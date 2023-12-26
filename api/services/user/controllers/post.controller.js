import PostModel from '../models/post.model.js';

class PostController {

    async CreatePost (req, res) {
        try {
            const post = {
                creathe_id: parseInt(`${req.user.id}`),
                file_id: 0,
                content: req.body.content
            }
            const file = {
                fullname: `${req.file.filename}`,
                extname: req.file.filename.split('.').pop()
            }
            await PostModel.CreateFileAndPost({file:file, post:post});
    
            return res
                .status(200)
                .json({ response: 'SUCCESS_POST_CREATE' })
    
        } catch (error) {
            console.log(error);
            return res
                .status(400)
                .json({ response: 'DANGER_POST_CREATE' })
        }
    }

    async AllPostUser (req, res) {    
        try {
            const id = (`${req.params.id}`);
            
            const result = await PostModel.GetAllPostById({id});
    
            return res
                .status(200)
                .json({ 
                    response: 'SUCCESS_POST_GET',
                    body: {
                        post: result[0]
                    }
                 })
    
        } catch (error) {
            console.log(error);
            return res
                .status(400)
                .json({ response: 'DANGER_POST_GET' })
        }
    
    }

}

const post = new PostController();

export default post;
