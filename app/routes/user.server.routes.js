const users = require('../controllers/user.server.controller');


module.exports = function(app) {
    
    
    app.route('/users')
        .get(users.list)
        .post(users.create)

    app.route('/users/:id')
        .get(users.read)
        .put(users.update)
        .delete(users.delete);
}