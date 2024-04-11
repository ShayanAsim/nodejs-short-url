const jwt = require('jsonwebtoken');
const secret = "shayan!23";

function setUser(user) {
    const payload = {
        _id: user._id,
        email: user.email
    };

    return jwt.sign(payload, secret);
}

function getUser(token) {
    try {
        if (!token) return null;
        return jwt.verify(token, secret);
    } catch (error) {
        console.error('Error verifying token:', error.message);
        return null;
    }
}

module.exports = {
    setUser,
    getUser
};
