const mysql = require('mysql');
const fs = require('fs');
const state = {
    pool: null
};


exports.connect = function(done) {

    fs.readFile(__dirname + "/../db_setup.sql", 'utf8', function(err, result){

         state.pool = mysql.createPool({
             host: "localhost",
             user: 'root',
             password: "password",
             port: "3306",
             database: "mysql",
             multipleStatements: true,
        });
        const sql = `select table_name from information_schema.tables where table_schema = "mysql" and table_name In ("Users", "Login", "Projects", "Creators", "Rewards", "Backers") ;`

        state.pool.query(sql, function(err, rows){

            if (!err) {
                if (rows.length !== 6){
                    state.pool.query(result, function(err, rows) {
                        done()
                    })
                } else {
                    console.log("Tables already exist...")
                    done()
                }
            } else {
                console.log("mysql is not running ... ")
                done()
            }

        })

    })

};

exports.get = function() {
    return state.pool
}



