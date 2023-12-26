import FollowModel from '../models/followers.model.js';

class FollowController {

    async Follow(req, res) {
        try {
            const paramId = parseInt(`${req.params.id}`); // a quein voy a seguir
            const userId = req.user.id; // quien soy
    
            await FollowModel.FollowFollower({ i:userId, your:paramId });
    
            
            return res
                .status(200)
                .json({ response:'SUCCESS_FOLLOW' });
    
        } catch (error) {
            console.log(error);
            return res
                .status(400)
                .json({ response:'DANGER_FOLLOW' });
        }
    }

}

const follow = new FollowController();

export default follow;
