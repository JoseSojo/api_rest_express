import jwt from 'jsonwebtoken';

const SECRET_KEY = 'api';

/**
 * USE IN ROUTES REQUIRED SESSION
 */
export const IsAuth = async (req, res, next) => {
    try {
        const token = req.header('token');
        if(!token) {
            return res
                .status(401)
                .json({response:'ERR_TOKEN_NOT_VALID'})
        }

        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        
        next()
    } catch (error) {
        console.log(error);
        return res
            .status(401)
            .json({response:'ERR_TOKEN_NOT_VALID'})
    }
}

/**
 * USE IN ROUTES NOT REQUIRED SESSION
 */
export const NotAuth = async (req, res, next) => {
    try {
        const token = req.header('token');
        if(token) {
            return res
                .status(401)
                .json({response:'ERR_EXITS_SESSION'})
        }

        next()
    } catch (error) {
        console.log(error);
        return res
            .status(401)
            .json({response:'ERR_EXITS_SESSION'})
    }
}
