const projects = require('../controllers/project.server.controller')
const MyMiddlewware = require('../controllers/middleware.server.controller')
const multer = require('multer');
const upload = multer({dest: 'images/'})


module.exports = function(app) {

    app.route('/api/v1/projects')
        .post(MyMiddlewware.createProject, projects.create)
        .get(projects.list)

    app.route('/api/v1/projects/:id')
        .get(projects.read)
        .put(MyMiddlewware.updateProject, projects.update)

    app.route('/api/v1/projects/:id/pledge')
        .post(MyMiddlewware.pledge, projects.pledge)

    app.route('/api/v1/projects/:id/image')
        .get(projects.getImage)
        .put(MyMiddlewware.image, upload.single('file'), projects.updateImage)
}