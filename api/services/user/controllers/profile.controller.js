import bcrypt from 'bcryptjs';
import ProfileModel from '../models/profile.model.js'
import {auth as AuthModel} from '../../auth/models/auth.model.js';

class ProfileController {

    async UpdateUser(req, res) {
        const { email, username, password, new_password } = req.body;
        const setUpdate = {email, username, password: ''};
        const HastPassword = bcrypt.hash(`${new_password}`, 11);
        const userId = parseInt(`${req.user.id}`);
     
        try {
            const user = await ProfileModel.ValidUserById({ id:userId });
    
            const validEmail = await AuthModel.CheckUserByEmail({ email });
            if(validEmail) {
                return res
                    .status(401)
                    .json({
                        reponse: 'DANGER_UPDATE_DATA_VERIFY_EMAIL'
                    })
            }

            const validUser = await AuthModel.CheckUserByUsername({ username });
            if(validUser) {
                return res
                    .status(401)
                    .json({
                        reponse: 'DANGER_UPDATE_DATA_VERIFY_USERNAME'
                    })
            }

            const compare = await AuthModel.ComparePassword({ password:password, dbPassword: user.password });

            if(!compare) {
                return res
                    .status(401)
                    .json({
                        reponse: 'DANGER_UPDATE_DATA_VERIFY_PASSWORD'
                    })
            }
    
            setUpdate.password = await HastPassword;
            console.log(new_password, setUpdate.password);
            await ProfileModel.UpdateUserById({ user:setUpdate, id:userId });
    
            return res
                .status(200)
                .json({
                    response: 'SUCCESS_UPDATE_DATA'
                })
    
        } catch (error) {
            console.log(error);
            return res
                .status(400)
                .json({
                    response: 'DANGER_UPDATE_DATA'
                })
        }
    }

    async GetAllUser(req, res) {
        try {
            const id = parseInt(`${req.user.id}`);
            const resultModel = await ProfileModel.GetAllUserById({ id });
    
            return res
                .status(200)
                .json({
                    response:'SUCCESS_GET_ALL_USER',
                    body: resultModel
                })
    
            
        } catch (error) {
            console.log(error);
            return res
                .status(400)
                .json({
                    response:'DANGER_GET_ALL_USER'
                })
        }
    }

    async PushProfile(req, res) {
        try {
            const id = parseInt(`${req.params.id}`); // id profile
            await ProfileModel.SetVisite(id);
            
            return res
                .status(200)
                .json({ response:'SUCCESS_VISITE' });
    
        } catch (error) {
            console.log(error);
            return res
                .status(400)
                .json({ response:'DANGER_VISITE' });
        }
    }

}

const profile = new ProfileController();

export default profile;
