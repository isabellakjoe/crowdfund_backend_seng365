const db = require('../../config/db')

exports.getAll = function() {
    return null
}

exports.getOne = function(id, done){

    db.get().query('SELECT * FROM Users WHERE id = ?', id, function(err, rows){
        if(err) return done(err)
        done(rows)
    })
};


exports.insert = function(data, done){
    let values = [data.username, data.location, data.email, data.password]

    db.get().query('INSERT INTO Users (username, location, email, password) VALUES (?, ?, ?, ?)', values, function(err, result){
        if(err) return done(err)
        done(result)
    })
};

exports.alter = function(){
    return null;
};

exports.remove = function(){
    return null;
};