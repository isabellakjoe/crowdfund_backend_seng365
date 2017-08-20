const db = require('../../config/db')

exports.getAll = function(done) {
    db.get().query('SELECT * FROM Users', function(err, rows){
        if(err) return done({"ERROR": "Error selecting"})
        return done(rows)
    })
}

exports.getOne = function(id, done){
    db.get().query('SELECT id, username, location, email FROM Users WHERE id = ?', id, function(err, rows){
        if(err) return done(err)
        done(rows)
    })
}

exports.insert = function(data, done){
    let values = [data.username, data.location, data.email, data.password]

    db.get().query('INSERT INTO Users (username, location, email, password) VALUES (?, ?, ?, ?)', values, function(err, result){
        if(err) return done(err)

        db.get().query('SELECT id FROM Users WHERE username=?', data.username, function(err, result){
            if(err) return done(err)

            let login_details = [result[0].id, false]
            db.get().query('INSERT INTO Login (user_id, is_logged_in) VALUES (?, ?)', login_details, function(err, result){
                if(err) return done(err)
                done(result)
            })
        })
    })
}

exports.alter = function(options, done){
    let values = [options.username, options.location, options.email, options.password, options.id]

    db.get().query('UPDATE Users SET username=?, location=?, email=?, password=?  WHERE id=?', values, function(err, result){
        if(err) return done(err)
        done(result)
    })
}

exports.remove = function(id, done){
    db.get().query('DELETE FROM Login WHERE user_id=?', [id], function(err, result){
        if(err) return done(err)
        db.get().query('DELETE FROM Users WHERE id=?', [id], function(err, result){
            if(err) return done(err)
            done("User deleted")
        })
    })
}

exports.loginUser = function(values, done){
    let options = [values.username, values.password]

    db.get().query("SELECT id FROM Users WHERE username=? AND password=?" ,options, function(err, result) {
        if(err) return done(err)
        if (result.length === 0) return done({ERROR:"Invalid username/password supplied"})

        let id = result[0].id

        db.get().query("UPDATE Login SET is_logged_in=true WHERE user_id=?" ,[id], function(err, result) {
            if(err) return done(err)
            done(id)
        })
    })
}

exports.logoutUser = function(token, done){
    db.get().query("UPDATE Login SET is_logged_in=false WHERE user_id=?", [token], function(err, result){
        if(err) return done(err)
        done("OK")
    })

}

exports.isLoggedIn = function(token, done){
    db.get().query('SELECT is_logged_in FROM Login WHERE user_id=?', [token], function(err, result){
        if(err) return done(0)
        let is_logged_in
        if (result.length === 0) {
            is_logged_in = false
        } else {
            is_logged_in = result[0].is_logged_in
        }
        done(is_logged_in)
    })

}

exports.getId = function(id, done){
    db.get().query('SELECT id FROM Users WHERE id=?', [id], function(err, result){
        if(err) return done(0)
        if (result.length === 0) {
            done(false)
        } else done(true)
    })
}

exports.checkUsers = function(ids, done) {

    db.get().query("SELECT * FROM Users WHERE id IN ?", [[ids]], function(err, result){
        if(err) return done(0)
        if(result.length == ids.length){
            done(true)
        } else done(false)
    })
}



