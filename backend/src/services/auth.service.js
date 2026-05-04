import bcrypt from 'bcrypt'
import prisma from '../prisma/client.js'



//REGISTER AND LOGIN WITH "email", for now

//======
//USER & HASH (10 SR)
//======
export const registerUser = async(email,password)=>{
    const hashedPassword = await bcrypt.hash(password,10);

    return prisma.user.create({
        data:{
            email,
            password: hashedPassword
        }
    });
};

//======
//LOGIN
//======            (findUnique == findOne(Mongo))

export const loginUser = async (email,password)=>{
    const user = await prisma.user.findUnique({
        where: {email}
    });

    if (!user) throw new Error('USER_NOT_FOUND');

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) throw new Error('INVALID_PASSOWORD');

    return user;
};