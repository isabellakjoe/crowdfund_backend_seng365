const db = require('../../config/db')

exports.getAll = function() {
    return null
}

exports.getOne = function(id, done){

    db.get().query('SELECT id, username, location, email FROM Users WHERE id = ?', id, function(err, rows){
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

exports.alter = function(options, done){
    let values = [options.username, options.location, options.email, options.password, options.id]

    db.get().query('UPDATE Users SET username=?, location=?, email=?, password=?  WHERE id=?', values, function(err, result){
        if(err) return done(err)
        done(result)
    })
};

exports.remove = function(id, done){
    db.get().query('DELETE FROM Users WHERE id=?', id, function(err, result){
        if(err) return done(err)
        done(result)
    })
};