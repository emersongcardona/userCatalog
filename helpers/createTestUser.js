require('dotenv').config();
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function upsertTestUser() {
    try {
        let user = await prisma.user.findFirst({ where: { email: process.env.TEST_USER_EMAIL } });

        if (!user) {
            const hashedPassword = await bcrypt.hash(process.env.TEST_USER_PASSWORD, 10);
            user = await prisma.user.create({
                data: {
                    name: process.env.TEST_USER_NAME,
                    email: process.env.TEST_USER_EMAIL,
                    encrypted_password: hashedPassword,
                    createdAt: new Date()
                }
            });

            console.log('test api user created success.');
        }
    } catch (error) {
        console.error('Error creating test user:', error);
    } finally {
        await prisma.$disconnect();
    }
}

module.exports = upsertTestUser;