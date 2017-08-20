const users = require('../controllers/user.server.controller');
const projects = require('../controllers/project.server.controller')


const login = (req, res, next) => {
    users.isUser(req.get('X-Authorization'), function(isUser){
        if(isUser == true){
            if (req.get('X-Authorization') == req.params.id) {
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

const updateProject = (req, res, next) => {

    users.isUser(req.get('X-Authorization'), function(isUser){
        if(isUser == true){
            let values = {
                authorization : req.get('X-Authorization'),
                project_id : req.params.id
            }
            projects.isProject(req.params.id, function(isValidProject){
                if(isValidProject == false){
                   return res.status(404).send("Not found")
                } else {
                    projects.isProjectCreator(values, function(isCreator) {
                        if (isCreator == true) {
                            next()
                        } else {
                            res.status(403).send("Forbidden - unable to update a project you do not own")
                        }
                    })
                }
            })




        } else {
            res.status(401).send("Unauthorized - create account to update project")
        }
    })

}


const logout = (req, res, next) => {

    users.isValidToken(req.get('X-Authorization' ), function(result) {
        if (result === 1) {
            next()
        } else {
            res.status(401).send("Unauthorized - not logged out")
        }
    })


}

module.exports = {
    login: login,
    logout: logout,
    updateProject: updateProject
}
