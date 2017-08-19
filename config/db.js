const mysql = require('mysql');
const state = {
    pool: null
};


exports.connect = function(done) {
    state.pool = mysql.createPool({

        host: "localhost",
        user: 'root',
        password: "password",
        port: "3306",
        database: "crowdfund",
        multipleStatements: true,
    });

    done();
};

exports.get = function() {
    return state.pool
}