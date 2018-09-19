const responseBuilderService = require('../services/responseBuilderService');

const Project = require('../../domain/Project');

const PROJECTS_FILES_URL = '/api/projects/files/';
const PROJECTS_FILES_ZIP_EXTENSION = '.zip';

const FILE_SYSTEM_PREFIX = '../../';
const FILE_SYSTEM_PROJECT_FILES_PATH = FILE_SYSTEM_PREFIX + 'file_system/project_files/';

function retrieveProjectFile(req, res) {
    let fileName = req.param('name');

    let filePath = FILE_SYSTEM_PROJECT_FILES_PATH + fileName;

    responseBuilderService.download(res, filePath);
}

function createProject(req, res) {
    let projectData = {
        title: req.body.title,
        description: req.body.description,
        requirements: req.body.requirements,
        daysActive: req.body.daysActive.split(' ')[0],
        category: req.body.category
    };

    Project.create(projectData).then(p => {
        if(req.files) {
            let uploadedFile = req.files.upload;
            let fileName = p._id.toString() + PROJECTS_FILES_ZIP_EXTENSION;
            let sourceLink = FILE_SYSTEM_PROJECT_FILES_PATH + fileName;
            let downloadLink = PROJECTS_FILES_URL + fileName;

            uploadedFile.mv(sourceLink, function (err) {
                if(err) responseBuilderService.internalServerError(res, {message: err});

                p.file = downloadLink;

                Project.findByIdAndUpdate(p.id, p).then(ip => {
                    responseBuilderService.ok(res, {message:'You did it!'});
                });
            });

            return;
        }

        responseBuilderService.ok(res, {message: 'You did it! Without file!'});
    });
}

function getProjects(req, res) {
    Project.find().then(projects => {
        responseBuilderService.ok(res, projects);
    })
}

module.exports = (function () {
    return {
        createProject: createProject,
        getProjects: getProjects,
        retrieveProjectFile: retrieveProjectFile
    }
}());