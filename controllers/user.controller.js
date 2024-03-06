const { PrismaClient } = require('@prisma/client');
const {response, errors, userNotFound} = require('../network/response')

const prisma = new PrismaClient();

const userList = async (req, res) =>{
    try {
        const users = await prisma.user.findMany({
            where: {deleted_at: null},
            select: {
                id: true,
                name: true,
                email: true,
            }
        });
        res.status(200).json(users);
        
    } catch (error) {
        console.error("error getting user list", error);
        res.status(500).json({error: `erro getting user list ${error}`});
    }
}

const userOne = async (req, res) => {
    try {
        const userId = req.params.id;
        const userFound = await prisma.user.findUnique({
            where: {
                id: parseInt(userId),
                deleted_at: null
            }
        });

        if (!userFound) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(userFound);

    } catch (error) {
        console.error("error getting  one user", error);
        res.status(500).json({error: `error getting one user ${error}`});    
    }
}

const userCreate  = async (req, res) => {
    try {
        const userData = req.body;
        const userCreated = await prisma.user.create({data: userData});
        res.status(200).json(userCreated);
    } catch (error) {
        console.error("error creating user", error);
        res.status(500).json({error: `error creating user ${error}`}); 
    }
}

const userUpdate = async (req, res) => {
    try {
        const userData = req.body;
        const userUpdate = await prisma.user.update({
            where:{ 
                id :parseInt(req.params.id),
                deleted_at: null
            },
            data: userData
        })

        res.status(200).json(userUpdate);

    } catch (error) {
        console.error("error updating user", error);
        res.status(500).json({error: `error updating user`}); 
    }
}

const userDelete = async (req, res) => {
    try {
        userId = req.params.id
        const userDeleted = await prisma.user.update({
            where: {
                id: parseInt(userId),
                deleted_at: null
            },
            data: {deleted_at : new Date()}
        });

        res.status(200).json(userDeleted);

        //response(req, res, userDeleted);
    } catch (error) {
        console.error("error deleting user", error);
        res.status(500).json({error: `error, couldnt delete user`}); 
    }
}


module.exports  = {userList, userOne, userCreate, userUpdate, userDelete }