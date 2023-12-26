import LoginModel from '../models/login.model.js';
import UserModel from '../../user/models/user.model.js';
import ProfileModel from '../../user/models/profile.model.js';

class AuthLoginController {
    async Login(req, res) {   
        try {
            const { email, password } = req.body;
            const checkEmail = await LoginModel.CheckUserByEmail({email})
    
            if(!checkEmail) {
                return res
                    .status(400)
                    .json({response:'ERR_LOGIN_VERRIFY_EMAIL'})
            }
    
            const compare = await LoginModel.ComparePassword({ password, dbPassword:checkEmail.password })
            if(!compare) {
                return res.status(400).json({response:'ERR_LOGIN_VERRIFY_PASSWORD'});
            }
    
            const token = await LoginModel.GenerateJWT({id:checkEmail.id});
    
            const post = await UserModel.GetPost({id:checkEmail.id, count:true});
            const follow = await UserModel.GetFollow({id:checkEmail.id, count:true});
            const followers = await UserModel.GetFollower({id:checkEmail.id, count:true});
            const profile = await ProfileModel.GetAllUserById({id:checkEmail.id});

            await LoginModel.UpdateDateSession({id:checkEmail.id}); 
               
            return res
                .status(201)
                .json({
                    response:'SUCCESS_CREATE_SUCCESS',
                    token:token,
                    body: {
                        user:checkEmail,
                        post:{count:post.count},
                        follow:{count:follow.count},
                        followers:{count:followers.count},
                        profile: profile.profile
                    }
                });
    
        } catch (error) {
            console.log(error);
            return res
                .status(400)
                .json({response:'ERR_NOT_LOGIN'})
        }
    }
}

const login = new AuthLoginController();

export default login;
