const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const emailExists = async (email) => {
    const userEmail = await prisma.user.findFirst({
        where: {
            email: email,
            deleted_at: null
        }
    });

    if (userEmail) throw new Error('email is already taken');
    return false
};

module.exports = {
    emailExists
};