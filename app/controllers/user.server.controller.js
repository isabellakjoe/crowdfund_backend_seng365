const User = require('../models/user.server.model')

exports.list = function(req, res) {
    User.getAll(function(result){
        res.json(result)
    })
}

exports.create = function(req, res) {
    try{
        let user_data = {
            username: req.body.user.username,
            location: req.body.user.location,
            email: req.body.user.email,
            password: req.body.password
        }

        User.insert(user_data, function (result) {
            res.status(201).send("OK")
        })
    }catch(err){
        res.status(400).send("Malformed request")


    }


}

exports.read = function(req, res) {

    let id = req.params.id
    User.getOne(id, function (result, code) {
        if (result.ERROR && code == 404) {
            res.status(404).send(result.ERROR)
        } else if(result.ERROR && code == 400){
            res.status(400).send(result.ERROR)
        } else {
            res.json(result)
        }

    })


}

exports.update = function(req, res){
    let options = {
        id : req.params.id,
        username : req.body.user.username,
        location : req.body.user.location,
        email : req.body.user.email,
        password : req.body.password

    }

    User.alter(options, function(result){
        if(result.ERROR){
            res.status(400).send(result.ERROR)
        }else {
            res.status(200).send("Updated")
        }

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
        username : req.query.username,
        password : req.query.password
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

