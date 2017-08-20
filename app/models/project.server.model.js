const db = require('../../config/db')


exports.insert = function(data, done){
    let project_data = [data.project_details.title, data.project_details.subtitle, data.project_details.description,
        data.project_details.imageUri, data.project_details.target]

    db.get().query('INSERT INTO Projects (title, subtitle, description, imageUri, target, open) VALUES (?, ?, ?, ?, ?, false)', project_data, function(err, res) {
        if (err) return done(err)
        let project_id = res.insertId

        let creator_data = []
        data.creator_details.forEach(function(creator){
            creator_data.push([creator.id, creator.name, project_id])
        })
        let reward_data = []
        data.reward_details.forEach(function(reward){
            reward_data.push([reward.id, reward.amount, reward.description, project_id])
        })

        creator_data.forEach(function(creator){
            db.get().query('INSERT INTO Creators (user_id, name, project_id) VALUES ?', [[creator]], function(err, res_creator) {
                if (err) return done(err)
            })
        })

        db.get().query('INSERT INTO Rewards (id, amount, description, project_id) VALUES ?', [reward_data], function(err, result){
            if (err) return done(err)
            done("OK")
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


exports.getOne = function(id, done){

    db.get().query('SELECT id, amount FROM Backers WHERE project_id=?', [id], function(err, backers_data){
        if(err) return done(err)
        backers_data.map(function(row){
            return{
                id: row.id,
                amount: row.amount
            }
        })

      db.get().query('SELECT target, SUM(amount) AS currentPledged, COUNT(Backers.id) AS numberOfBackers ' +
          'FROM Backers, Projects  WHERE Backers.project_id=? AND Projects.id=? ', [id, id], function(err, progress_data){
          if(err) return done(err)
          let progress = {
              target: progress_data[0].target,
              currentPledged: progress_data[0].currentPledged,
              numberOfBackers: progress_data[0].numberOfBackers
          }

          db.get().query('SELECT id, amount, description FROM Rewards WHERE project_id=?', [id], function(err, rewards_data){
              if(err) return done(err)
              rewards_data.map(function(row){
                  return{
                      id: row.id,
                      amount: row.amount,
                      description: row.description
                  }
              })

              db.get().query('SELECT user_id, name FROM Creators WHERE project_id=?', [id], function(err, creators_data){
                  if(err) return done(err)
                  creators_data.map(function(row){
                      return{
                          user_id: row.user_id,
                          name: row.name
                      }
                  })


                  db.get().query('SELECT title, subtitle, description, imageUri target FROM Projects WHERE id=?', [id], function(err, result){
                      if(err) return done(err)
                     let data =  {
                             title: result[0].title,
                             subtitle: result[0].subtitle,
                             description: result[0].description,
                             imageUri: result[0].imageUri,
                             target: result[0].target,
                             creators: creators_data,
                             rewards: rewards_data
                         }

                      db.get().query('SELECT id, creationDate FROM Projects WHERE id=?', [id], function(err, result){
                          if(err) return done(err)
                          if (result.length === 0) return done({ERROR:"Not found"})

                          let project = {
                              id: result[0].id,
                              creationDate: result[0].creationDate,
                              data: data,
                              progress: progress,
                              backers: backers_data
                          }

                          done(project)

                      }) }) }) }) }) })
}

exports.alter = function(values, done){

    let options = [values.open, values.id]

    db.get().query('UPDATE Projects SET open=? WHERE id=?', options, function(err, results){
        if(err) return done({ERROR: "Malformed request"})
        done("OK")
    })

}

exports.isCreator = function(values, done){
    let options = [values.authorization, values.project_id]
    db.get().query('SELECT user_id FROM Creators WHERE user_id=? AND project_id=?', options, function(err, result){
        if(err) return done(err)
        let isCreator
        if (result.length === 0) {
            isCreator = false
        } else {
            isCreator = true
        }
        done(isCreator)
    })



}

exports.isValidProject = function(id, done){
    db.get().query('SELECT id FROM Projects WHERE id=?', [id], function(err, result){
        if(err) return done(false)
        let isProject
        if (result.length === 0) {
            isProject = false
        } else {
            isProject = true
        }
        done(isProject)
    })
}

exports.pledgeToProject = function(values, done){

    let options = [values.project_id, values.amount, values.anonymous, values.authToken]

    db.get().query('INSERT INTO Backers (project_id, amount, anonymous, cardAuthToken) VALUES (?, ?, ?, ?)', options, function(err, result){
        if(err) return done({ERROR: 'Bad user, project, or pledge details'})
        done(result)
    })


}

exports.image = function(id, image, done){

    let values = [image, id]
    db.get().query('UPDATE Projects SET image=? WHERE id=?', values, function(err, result){
        if(err) return done({ERROR: "Malformed request"})
        done("OK")
    })

}

exports.getImage = function(id, done){

    db.get().query('SELECT image FROM Projects WHERE id=?', [id], function(err, result){
        if(err) return done({ERROR: "Malformed request"})
        done("OK")
    })
}