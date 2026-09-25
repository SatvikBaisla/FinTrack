const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    // check for authorization in header 
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: 'Access token required'
        })
    }

    // if we have header -> get token form header 
    const token = authHeader.split(' ')[1];

    try {
        const decode = jwt.verify(
            token,
            process.env.AT_SALT
        )

        req.user = decode;

        next();
    }
    catch (err) {
        return res.status(401).json({
            success: false,
            message: 'Invaild or expired token'
        })
    }
}

module.exports = authenticateToken;