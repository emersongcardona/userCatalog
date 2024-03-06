const success = (req, res, message, status) => {
    let statusCode = status || 200;
    let statusMessage = message || '';

    return res.status(statusCode).send({
        error: false,
        status: statusCode,
        body: statusMessage,
    });
};
const err = (req, res, error, status) => {
    let statusCode = status || 500;
    let statusMessage = error || 'Internal server error';
    console.error('[Response error] ' + error);
    res.status(statusCode).send({
        error: statusMessage,
        status: statusCode,
    });
};


const response = (req, res, user) =>{
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user)
}

module.exports = {
    success,
    err,
    response
};