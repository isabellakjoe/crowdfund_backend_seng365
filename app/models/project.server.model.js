const db = require('../../config/db')


exports.insert = function(data, done){
    let project_data = [data.project_details.title, data.project_details.subtitle, data.project_details.description,
        data.project_details.imageUri, data.project_details.target]
    let creator_data = [data.creator_details[0].id, data.creator_details[0].name]
    let reward_data = [data.reward_details[0].id, data.reward_details[0].amount, data.reward_details[0].description]

    db.get().query('INSERT INTO Projects (title, subtitle, description, imageUri, target) VALUES (?, ?, ?, ?, ?)', project_data, function(err, result) {
        if (err) return done(err)

        db.get().query('INSERT INTO Creators (user_id, name) VALUES (?, ?)', creator_data, function(err, result){
            if (err) return done(err)

            db.get().query('INSERT INTO Rewards (id, amount, description) VALUES (?, ?, ?)', reward_data, function(err, result){
                if (err) return done(err)
                done(result)
            })

        })

    })
}


exports.getAll = function(limits, done){
    let values = [limits.startIndex, limits.count]

    db.get().query('SELECT * FROM Projects LIMIT ?, ?', values, function(err, result){
        if(err) return done(err)
        done(result)
    })
}

exports.getOne = function(){

}