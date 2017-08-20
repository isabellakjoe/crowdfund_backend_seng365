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


exports.getOne = function(id, done){

    db.get().query('SELECT id, amount FROM Backers WHERE project_id=?', [id], function(err, backers_data){
        if(err) return done(err)

        backers_data.map(function(row){
            return{
                id: row.id,
                amount: row.amount
            }
        })

      db.get().query('SELECT target, SUM(amount) AS currentPledged, COUNT(Backers.id) AS numberOfBackers FROM Backers, Projects  WHERE Backers.project_id=? AND Projects.id=? ', [id, id], function(err, progress_data){
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

                          let project = {
                              id: result[0].id,
                              creationDate: result[0].creationDate,
                              data: data,
                              progress: progress,
                              backers: backers_data
                          }


                          done(project)
                      })

                  })

              })

          })

      })



    })


}