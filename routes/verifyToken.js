const jwt = require('jsonwebtoken')



module.exports = function (req, res, next){
    //next()
    // Gather the jwt access token from the request header
    const token = req.header('auth-token')
    if (!token) return res.send('Access Denied no token currently') // if there isn't any token

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
    }catch (err) {
        // res.status(400).send("Invalid auth-token")
        return res.send("Invalid auth-token")
    }
    next()
  }


  