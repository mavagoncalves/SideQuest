import bcrypt from 'bcrypt'
import { prisma } from '../../prisma/prisma.js';

export const registerUser = async(email, password, firstName, lastName, role)=>{
    const hashedPassword = await bcrypt.hash(password,10);

    return prisma.user.create({
        data:{
            email,
            passwordHash: hashedPassword,
            firstName,  
            lastName,
            role: role || 'CLIENT'
        }
    });
};


export const loginUser = async (email,password)=>{
    const user = await prisma.user.findUnique({
        where: {email},
        include: { profile: true }
    });

    if (!user) throw new Error('USER_NOT_FOUND');

    const valid = await bcrypt.compare(password, user.passwordHash);

    if (!valid) throw new Error('INVALID_PASSWORD');

    return user;
};