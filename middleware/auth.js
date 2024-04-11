const  {getUser} = require('../service/auth')


async function checkForAuthentication(req, res, next){
    const authorizationHeaderValue = req.header["authorization"];
    req.user = null;
    if(!authorizationHeaderValue || authorizationHeaderValue.startWith('Bearer'))
    return next();


    
    getUser
}

async function restricTologinUser(req,res,next){

        const userUid = req.cookies?.uid;


        if(!userUid) return res.redirect("/login")
        const user = getUser(userUid)

        if(!user) return res.redirect("/login");

        req.user = user;
        next();
}

async function checkAuth(req, res, next){
    const userUid = req.cookies?.uid;


    const user = getUser(userUid)


    req.user = user;
    next();
}
module.exports={
    restricTologinUser,
    checkAuth
}