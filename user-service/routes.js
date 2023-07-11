const express = require("express")
const router = express.Router()

const JWT = require('./utils/JWT');

router.get('/users', async (req, res) => {
    const User = require('./models/users');
    const users = await User.find();

    const filteredUsers = users.map(user => {
        const { password, ...userWithoutPassword } = user._doc;
        return userWithoutPassword;
    })
    
    res.send(filteredUsers);
})

router.post('/register', async (req, res) => {
    let user = null
    try {
        user = await generateUserRegistation(req, res)
        const token = generateToken(user)
        return res.status(201).send({ token })
    }
    catch(err){
        if(user != null){
            const User = require('./models/users')
            await User.deleteOne({ _id: user.userIdForToken })
        }
        return
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        if(!email || !password){
        return res.status(400).send('Missing fields')
        }
        
        const User = require('./models/users');

        const user = await User.findOne({ email });

        if (!user) {
        return res.status(404).send('User not found');
        }

        const argon2 = require('argon2');
        const validPassword = await argon2.verify(user.password, password);
        if (!validPassword) {
            return res.status(400).send('Invalid password');
        }

        const userforToken = {
            userIdForToken: user._id,
            usernameForToken: user.username,
            emailForToken: user.email
        }

        return res.status(200).send({ token: generateToken(userforToken) });
    }
    catch(err){
        return res.send(err);
    }
})

////////////////////////// FUNCTIONS //////////////////////////

async function generateUserRegistation(req, res) {
    try {
        validateRegistationRequest(req, res)
        let user = await saveUsertoDB(req)
        return { 
            userIdForToken: user._id, 
            usernameForToken: user.username, 
            emailForToken: user.email
        }
    }
    catch(err){
        catchRegistation(err, res)
    }
}

function generateToken(user) {
    const jwt = new JWT()
    const token = jwt.generateToken(
        { 
            id: user.userIdForToken, 
            username: user.usernameForToken, 
            email: user.emailForToken, 
            iat: Math.floor(Date.now() / 1000) - 30 
        })
    return token
}

function validateRegistationRequest(req, res){
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).send('Missing fields')
    }

    if(password.length < 8){
        return res.status(400).send('Password must be at least 8 characters long')
    }
    if(password.length > 32){
        return res.status(400).send('Password must be at most 32 characters long')
    }
}

async function saveUsertoDB(req){
    const { username, email, password } = req.body;

    const argon2 = require('argon2')
    const hashedPassword = await argon2.hash(password)
    
    const User = require('./models/users')
    const user = new User({
        username,
        email,
        password: hashedPassword,
    });

    await user.save()
    return user
}

function catchRegistation(err, res){
    if(err['code'] === 11000 && err['keyPattern']['username']){
        return res.status(400).send('Username already exists');
    }
    if(err['code'] === 11000 && err['keyPattern']['email']){
        return res.status(400).send('Email already exists');
    }
    if(err?.errors?.email){
        return res.status(400).send(err?.errors?.email?.message);
    }
    if(err?.errors?.username){
        return res.status(400).send(err?.errors?.username?.message);
    }
    if(err?.errors?.password){
        return res.status(400).send(err?.errors?.password?.message);
    }

    return res.status(500).send(err)
}

module.exports = router