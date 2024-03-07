
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const checkIdExists = async (req, res, next) => {
    try {
        const id = req.params.id;

        //if is not a number or  less than 1 return error
        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ error: 'Invalid ID. ID must be a number greater than zero.' });
        }

        //user should exists to process  the request
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(id),
                deleted_at: null
            }
        });


        if (!user) {
            return res.status(404).json({ error: 'User Not found' });
        }
        next();

    } catch (error) {
        console.error('Error searching id:', error);
        return res.status(500).json({ error: 'Error searching id' });
    }
}

module.exports = {checkIdExists}
