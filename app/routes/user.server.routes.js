const users = require('../controllers/user.server.controller')
const projects = require('../controllers/project.server.controller')
const MyMiddlewware = require('../controllers/middleware.server.controller')



module.exports = function(app) {

    app.route('/api/v1/users')
        .get(users.list)
        .post(users.create)

    app.route('/api/v1/users/:id')
        .get(users.read)
        .put(MyMiddlewware.login, users.update)
        .delete(MyMiddlewware.login, users.delete)

    app.route('/api/v1/users/login')
        .post(users.login)

    app.route('/api/v1/users/logout')
        .post(MyMiddlewware.logout, users.logout)

    app.route('/api/v1/projects')
        .post(projects.create)
        .get(projects.list)

    app.route('/api/v1/projects/:id')
        .get(projects.read)
        .put(MyMiddlewware.updateProject, projects.update)

}

