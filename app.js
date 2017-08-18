const db = require('./config/db')
const express = require('./config/express')

const app = express()

process.env.PORT = 4941

db.connect( function(err) {
    if(err) {
        console.log("Cant connect to mysql");
        process.exit(1)
    } else {
        app.listen(process.env.PORT, function() {
            console.log("listening on port: " + process.env.PORT)
        })
    }
})