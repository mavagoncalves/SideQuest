import {prisma} from '../../prisma/prisma.js'


//GET ALL ACCOUNTS = TALENT (user accounts with role 'TALENT'= students seeking job)
export const  getMarketPlaceUsers = async (req , res) => {
    try{
        const users = await prisma.user.findMany({

            where:{
                role: 'TALENT'
            },

            include: {
                skills:{
                    include:{
                        skill:true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        res.json(users);
    }   catch(error){ 
        res.status(500).json({
            error:'INTERNAL_SERVER_ERROR'
        });
    }
};

//GET ONE TALENT BY Id, click profile => open
export const getMarketPlaceUserById = async(req , res)=>{
    try{
        const {id} = req.params;
        const user =await prisma.user.findUnique({
            where :{id},

            include: {
                skills:{
                    include:{
                        skill:true
                    }
                }
            }
        });

        if(!user){
            return res.status(404).json({error: 'USER_NOT_FOUND'});
        }
        res.json(user);
    } catch(error){
        res.status(500).json({error: 'INTERNAL_SERVER_ERROR'});
    }
};

//GET USERS BY FILTER SEARCH (skill, location, name)
export const getMarketPlaceUsers = async (req ,res)=>{
    const {skill,location,name} = req.query;

    try{
        const users = await prisma.user.findMany({
            where : {
                role : 'TALENT',
                ...(skill && {
                    skills : {
                        some : {
                            skill: {
                                name: skill
                            }
                        }
                    }
                }),
                ...(location &&{
                    location : {
                        contains : location,
                        mode: 'insensitive' //no difference between upper/lower case
                    }
                }),
                ...(name &&{
                    OR : [
                        {
                            firstName: {
                                contains : name,
                                mode : 'insensitive'
                            }
                        },
                        {
                            lastName : {
                                contains : name,
                                mode: 'insensitive'
                            }
                        }
                    ]
                })
            },
            include : {
                skills: {
                    include : {
                        skill : true
                    }
                }
            },
            orderBy : {
                createdAt : 'desc'
            }
        }
        )
        res.json(users);
    }   catch(error){
        res.status(500).json({error: 'INTERNAL_SERVER_ERROR'})
    }
};
