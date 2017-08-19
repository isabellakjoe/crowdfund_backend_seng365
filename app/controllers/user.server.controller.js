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

        res.status(200).send(result)
    })
}

exports.login = function(req, res){
    let values = {
        username : req.body.username,
        password : req.body.password
    }

    User.loginUser(values, function(result){
        if (result.ERROR) {
            res.status(400).send(result.ERROR)
        } else {
            let login_data = {
                id : result,
                token : result
            }
            res.send(login_data)
        }
    })
}


exports.logout = function(req, res){
    User.logoutUser(req.get('X-Authorization'), function(result){
        res.status(200).send(result)
    })
}

exports.isValidToken = function(token, done){
    User.isLoggedIn(token, function(result){

        return done(result)
    })
}


exports.isUser = function(id, done){
    User.getId(id, function(result){

        return done(result)
    })
}