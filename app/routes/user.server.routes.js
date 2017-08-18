const users = require('../controllers/user.server.controller');
const MyMiddlewware = require('../controllers/middleware.server.controller')



module.exports = function(app) {

    app.route('/users')
        .get(users.list)
        .post(users.create)

    app.route('/users/:id')
        .get(users.read)
        .put(users.update)
        .delete(users.delete)

    app.route('/users/login')
        .post(MyMiddlewware.myMiddleware, users.login)

}

