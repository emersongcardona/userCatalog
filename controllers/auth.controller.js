const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const findUser = async (req, res) =>{

    const { email, password } = req.body;
    const user = await prisma.user.findFirst({ where: { email } });
    
    if (!user) {
        return res.status(401).json({ message: 'email or password incorrect' });
    }

    const passwordMatch = await bcrypt.compare(password, user.encrypted_password);
    if (!passwordMatch) {
        return res.status(401).json({ message: 'email or password incorrect' });
    }

    try {
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_KEY, {expiresIn: '8h'},);
        res.json({ token });
    } catch (error) {
        console.error("Error generating jwt :", error);
        res.status(500).json({ error: "Error generating jwt" });
    }


}

module.exports = {findUser}