import { prisma } from "../../prisma/prisma.js"


// CREATE => REQUEST
export const createRequest = async (req, res) =>{
    try{
        const {title, message, proposedPrice, talentId} = req.body;

        const clientId = req.user?.id;

        if (!clientId) {
            return res.status(401).json({error: "UNAUTHORIZED"});
        }

        const request = await prisma.request.create ({
            data : {
                title,
                message,
                proposedPrice,
                clientId,
                talentId,
            },
        });


        res.status(201).json(request);
    }   catch(error) {
        res.status(500).json({error: "INTERNAL_SERVER_ERROR"});
    }
};


// GET => REQUESTS RECEIVED (TALENT pov)
export const getTalentRequests = async (req, res)=>{
    try{
        const {talentId} = req.params;
        
        const requests = await prisma.request.findMany({
            where : {talentId},
            include : {
                client : true,
            },
            orderBy : {
                createdAt : "desc",
            },
        });

        res.json(requests);
    }   catch (error) {
        res.status(500).json({error:"INTERNAL_SERVER_ERROR"});
    }
};


// GET => REQUESTS SENT (CLIENT pov)
export const getClientRequests = async (req, res)=>{
    try{
        const {clientId} = req.params;
        
        const requests = await prisma.request.findMany({
            where : {clientId},
            include : {
                client : true,
            },
            orderBy : {
                createdAt : "desc",
            },
        });

        res.json(requests);
    }   catch (error) {
        res.status(500).json({error:"INTERNAL_SERVER_ERROR"});
    }
};


// UPDATE OF REQUEST STATUS (ACCEPT / REJECT) for TALENT only
export const updateRequestStatus = async (req, res)=>{
    try {
        const {id} = req.params;
        const {status} = req.body;

        const updated = await prisma.request.update({
            where : {id},
            data : {status},
        });

        res.json(updated);
    }   catch(error) {
            res.status(500).json({error: "INTERNTAL_SERVER_ERROR"});
    }
};