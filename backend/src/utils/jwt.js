import jwt from 'jsonwebtoken';



export const signToken = (userId) => {
    return jwt.sign(
        {id: usedId},
        process.env.JWT_SECRET,
        {expiresIn: '7d'} //7 DAYS?
    );
};