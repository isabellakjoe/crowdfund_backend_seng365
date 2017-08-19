const users = require('../controllers/user.server.controller');


const myMiddleware = (req, res, next) => {
    users.isUser(req.params.id, function(isUser){
        if(isUser == true){
            if (req.get('X-Authorization' ) == req.params.id) {
                users.isValidToken(req.get('X-Authorization' ), function(result) {
                    if (result === 1) {
                        next()
                    } else {
                        res.status(401).send("Unauthorized - not logged in")
                    }
                })
            } else {
                res.status(403).send("Forbidden - account not owned")
            }
        } else {
            res.status(404).send("User not found")
        }
    })
}


module.exports = {
    myMiddleware: myMiddleware,
}
