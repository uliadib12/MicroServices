class JWT{
    constructor(){        
        this.jwt = require('jsonwebtoken');
    }

    generateToken(payload){
        return this.jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    }
}

module.exports = JWT;