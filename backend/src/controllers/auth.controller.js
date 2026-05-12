import {registerUser, loginUser} from '../services/auth.service.js'


export const register = async (req, res)=>{
    try{
        const {email,password} = req.body;
        const user = await registerUser(email,password);

        res.status(201).json({
            message: 'User created',
            user: {id: user.id, email: user.email}
        });
    } catch (error){
        res.status(400).json({error: error.message})
    }
};

export const login = async(req,res)=>{
    try{
        const {email,password} = req.body;

        const {user, token} = await loginUser(email,password);

        res.json({
            token,
            user: {id: user.id, email: user.email}
        });
    } catch (error) {
        res.status(401).json({error: error.message});
    }
};