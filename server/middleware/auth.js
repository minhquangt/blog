const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        // get token
        const token = req.headers.authorization;
        // check token is valid
        if (!token)
            return res.status(400).json({ msg: 'Invalid Authentication' });

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ msg: 'Invalid Authentication' });
            }
            req.user = user;
            next();
        });
    } catch (error) {
        return res.status(500).json({ msg: err.message });
    }
};

module.exports = auth;