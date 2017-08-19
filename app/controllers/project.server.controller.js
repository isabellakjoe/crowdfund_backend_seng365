const Project = require('../models/project.server.model')
const User = require('../models/user.server.model')

exports.create = function(req, res) {

    let creators = req.body.creators
    let ids_to_check = []

    creators.forEach(function(creator) {
        ids_to_check.push(creator.id)
    })

    return User.checkUsers(ids_to_check, function(result){
        if(result == false){
           return res.status(400).send("Malformed project data")
        }
    })

    let project_details = {
        title : req.body.title,
        subtitle : req.body.subtitle,
        description : req.body.description,
        imageUri : req.body.imageUri,
        target : req.body.target
    }

    let creator_details = req.body.creators
    let reward_details = req.body.rewards

    let options = {
        project_details: project_details,
        creator_details: creator_details,
        reward_details: reward_details
    }

    //Check if users exists
    //Create the project
    //Insert creators
    //Insert the rewards

    Project.insert(options, function(result){
        res.json(result)
    })


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

    Projects.getOne(id, function(result){
        res.json(result)
    })



}