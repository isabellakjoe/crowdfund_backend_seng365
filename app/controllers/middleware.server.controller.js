const users = require('../controllers/user.server.controller');


const myMiddleware = (req, res, next) => {
    if (isValidToken (req.get('X-Authorization' ))) {
        next(); // if we have a valid token, we can proceed
    } else {
        res.sendStatus (401); // otherwise respond with 401 unauthorized
    }
}

let isValidToken = function(token){
    return users.isValidToken(token)

}


module.exports = {
    myMiddleware: myMiddleware,
}
