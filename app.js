const db = require('./config/db')
const express = require('./config/express')

const app = express()

// process.env.PORT = 8080

db.connect( function(err) {
    if(err) {
        console.log("Cant connect to mysql");
        process.exit(1)
    } else {
        app.listen(4819, function() {
            console.log("listening on port: " + process.env.PORT)
        })
    }
})