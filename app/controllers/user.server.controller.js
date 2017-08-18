const User = require('../models/user.server.model')

exports.list = function(req, res) {
    User.getAll(function(result){
        res.json(result)
    })
}

exports.create = function(req, res) {
    let user_data = {
        username: req.body.username,
        location: req.body.location,
        email: req.body.email,
        password: req.body.password
    }

    User.insert(user_data, function(result){
        res.json(result)
    })


}

exports.read = function(req, res) {
    let id = req.params.id
    User.getOne(id, function(result){
        res.json(result)
    })
}

exports.update = function(req, res){
    let options = {
        id : req.params.id,
        username : req.body.username,
        location : req.body.location,
        email : req.body.email,
        password : req.body.password

    }

    User.alter(options, function(result){
        res.json(result)
    })
}

exports.delete = function(req, res){
    let id = req.params.id
    User.remove(id, function(result){
        res.json(result)
    })
}

exports.login = function(req, res){
    let values = {
        username : req.body.username,
        password : req.body.password
    }

    User.getInfo(values, function(result){
        res.json(result)
    })
}

