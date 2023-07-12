const jwt = require('jsonwebtoken');
const JWT_SECRET = "iamdevesh"

const fetchuser = (req, res, next) => {

    //creating header name auth-token that take the authentication token
    const token = req.header('auth-token');

    //if token is empty then return bad requests
    if (!token) {
        res.status(401).send({ error: "please authenticate using valid token" })
    }


    try {
        //verify the data from database by authtoken and give the user 
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user
        next()
    }

    //if any internal error then return bad requests
    catch (error) {
        res.status(401).send({ error: "please authenticate using valid token" })
    }
}

module.exports = fetchuser