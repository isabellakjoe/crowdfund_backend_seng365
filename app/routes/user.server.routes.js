const users = require('../controllers/user.server.controller');
// const myMiddleware = (req, res, next) => {
//     if (isValidToken (req.get('X-Authorization' ))) {
//         next(); // if we have a valid token, we can proceed
//     } else {
//         res.sendStatus (401); // otherwise respond with 401 unauthorized
//     }
// }

module.exports = function(app) {

    app.route('/users')
        .get(users.list)
        .post(users.create)

    app.route('/users/:id')
        .get(users.read)
        .put(users.update)
        .delete(users.delete)

    app.route('/users/login')
        .get(users.login)

    // app.route('/api/v1/users/:id')
    //     .get(users.getOne)
    //     .put(myMiddleware, users.update)
    //     .delete(myMiddleware, users.remove)

}

