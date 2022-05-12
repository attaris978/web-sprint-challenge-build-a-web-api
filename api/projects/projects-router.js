// Write your "projects" router here!
const express = require('express');
const {get, insert, update, remove, getProjectActions} = require('./projects-model');
const {verifyProjectId} = require('./projects-middleware');
const projectsRouter = express.Router();

projectsRouter.get('/', (req, res) => {
    get()
    .then(projects => res.status(200).json(projects))
    .catch(() => res.status(500).json({ message: "Failed to retrieve the list of projects"}))
})

projectsRouter.get('/:id', verifyProjectId, (req, res) => {
    get(req.params.id)
    .then(projects => res.status(200).json(projects))
    .catch(() => res.status(404).json({ message: "No project with that ID exists"}))
})

module.exports = projectsRouter;