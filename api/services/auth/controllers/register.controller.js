import RegisterModel from '../models/register.model.js';

class AuthRegisterController {

    Register = async (req, res) => {    
        try {
            const {username, email, password} = req.body;
        
            const hash = RegisterModel.HashPassword({password});

            const validUser = RegisterModel.CheckUserByUsername({username});
            const validEmail = RegisterModel.CheckUserByEmail({email});

            if(await validUser) {
                return res
                    .status(400)
                    .json({ response:'DANGER_REGISTER_VERIFY_USERNAME' });
            }

            if(await validEmail) {
                return res
                    .status(400)
                    .json({ response:'DANGER_REGISTER_VERIFY_EMAIL' });
            }

            const PasswordHassed = await hash;
            const userId = await RegisterModel.CreateUser({username,email,password:PasswordHassed});
            await RegisterModel.CreateProfile({user_id:userId});
    
            return res
                .status(201)
                .json({response:'SUCCESS_CREATE_SUCCESS'}) 
    
        } catch (error) {
            console.log(error);
            return res
                .status(400)
                .json({response:'ERR_NOT_CREATE'})
        }
    }
}

const register = new AuthRegisterController();

export default register;
