const db = require('../../config/db')

exports.setup = function(done){


    db.get().query("CREATE TABLE Users IF NOT EXISTS(\n" +
        "  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,\n" +
        "  username VARCHAR(10) NOT NULL UNIQUE,\n" +
        "  location VARCHAR(30),\n" +
        "  email VARCHAR(40) NOT NULL,\n" +
        "  password VARCHAR(20)\n" +
        ")", null, function(err){
        if (err) return done(err)
    })



}
