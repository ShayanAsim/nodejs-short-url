const {v4: uuidv4} = require('uuid');
const User = require('../models/user');

const {setUser,getUser} = require('../service/auth')

async function handleCreateUserSignUp(req, res) {
    const {name,email,password} = req.body;
    await User.create({
        name,email,password,
    });
    return res.render("home")
}


async function handleUserLogin(req, res) {
    const {email,password} = req.body;
    const user = await User.findOne({
        email,password
    })
    if (!user) {
        return res.render("login", {
            error: "Invalid Credentials"
        });
    } else {
        // const sessionId = uuidv4();
        const token = setUser(user)
        res.cookie('uid',token)
        return res.redirect("/");
    }
}



module.exports = {
    handleCreateUserSignUp,
    handleUserLogin
};
