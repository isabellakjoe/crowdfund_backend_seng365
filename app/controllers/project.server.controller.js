const Project = require('../models/project.server.model')
const User = require('../models/user.server.model')

exports.create = function(req, res) {
    try {
        let creators = req.body.creators
        let ids_to_check = []

        creators.forEach(function (creator) {
            ids_to_check.push(creator.id)
        })

        return User.checkUsers(ids_to_check, function (result) {
            if (result == false) {
                return res.status(400).send("Malformed project data")
            } else {
                let project_details = {
                    title: req.body.title,
                    subtitle: req.body.subtitle,
                    description: req.body.description,
                    imageUri: req.body.imageUri,
                    target: req.body.target
                }

                let creator_details = req.body.creators
                let reward_details = req.body.rewards

                let options = {
                    project_details: project_details,
                    creator_details: creator_details,
                    reward_details: reward_details
                }

                Project.insert(options, function (result) {
                    res.status(201).send(result)

                })
            }
        })
    }catch(err){
        res.status(400).send("Malformed project data")
    }

}

exports.list = function(req, res){
    let limits = {
        startIndex: parseInt(req.query.startIndex) || 0,
        count: parseInt(req.query.count) || 10000
    }

    Project.getAll(limits, function(result){
        res.json(result)
    })
}


exports.read = function(req, res){
    let id = req.params.id

    Project.isValidProject(id, function(result){
        if(result == true){
            Project.getOne(id, function(result){
                if (result.ERROR) {
                    return res.status(404).send(result.ERROR)
                }else {
                   return res.json(result)
                }
            })
        } else{
            res.status(404).send("Not found")
        }
    })


}

exports.update = function(req, res){

    let values = {
        id : req.params.id,
        open: req.body.open
    }

    Project.alter(values, function(result){
        if (result.ERROR) {
            res.status(404).send(result.ERROR)
        }else {
            res.status(201).send(result)
        }

    })

}

exports.isProjectCreator = function(values, done){
    Project.isCreator(values, function(result){

        return done(result)
    })
}

exports.isProject = function(id, done){
    Project.isValidProject(id, function(result){

        return done(result)
    })
}

exports.pledge = function(req, res){
    try {
        let values = {
            project_id: req.params.id,
            id: req.body.id,
            amount: req.body.amount,
            anonymous: req.body.anonymous,
            authToken: req.body.card.authToken
        }

        Project.pledgeToProject(values, function (result) {
            if (result.ERROR) {
                return res.status(400).send(result)
            } else {
                return res.status(200).send("OK")
            }
        })
    }catch(err){
        res.status(400).send("Bad user, project, or pledge details")
    }

}

exports.updateImage = function(req, res){
    try {
        let id = req.params.id
        Project.image(id, req.file.path, function (result) {
            return res.status(200).send(result)
        })
    }catch(err){
        res.status(400).send("Malformed request")
    }
}

exports.getImage = function(req, res){
    try{
        let id = req.params.id
        Project.isValidProject(id, function(result){
            if(result == true){
                Project.getImage(id, function(result){
                    if(result.ERROR){
                        return res.status(400).send(result.ERROR)
                    }
                    return res.header("Content-Type", "image/png").sendFile(result[0].imageUri, {root: "./"})
                })
            } else {
                return res.status(404).send("Not found")
            }
        })
    }catch(err){
        res.status(400).send("Malformed request")
    }
}

exports.reward = function(req, res) {
    try {
        let values = {
            id: req.params.id,
            rewards: req.body
        }

        Project.reward(values, function (result) {
            return res.status(201).send(result)
        })
    }catch(err){
        res.status(400).send("Malformed request")
    }

}

exports.getReward = function(req, res){

    let id = req.params.id

    Project.getReward(id, function(result){

        if(result.ERROR){
            res.status(400).send(result.ERROR)
        }else{
            res.json(result)
        }

    })

}
