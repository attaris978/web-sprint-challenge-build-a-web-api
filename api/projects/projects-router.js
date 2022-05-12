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

projectsRouter.post('/', (req, res) => {
    const {name, description} = req.body;
    if (!name || !description) {
        res.status(400).json({message: "New project entries require name and description fields"})
    } else {
        insert(req.body)
        .then(newProject =>  res.status(201).json(newProject))
        .catch(() => res.status(500).json({message: "Failed to post new project"}))
    }
})

projectsRouter.put('/:id', verifyProjectId, (req, res) => {
    const {name, description, completed} = req.body;
    if (!name || !description || typeof completed !== 'boolean') {
        res.status(400).json({message: "Project updates require name, description, and completed fields"})
    } else {
        update(req.params.id, req.body)
        .then(updatedProject =>  res.status(200).json(updatedProject))
        .catch(() => res.status(500).json({message: "Failed to update project"}))
    }
})

projectsRouter.delete('/:id', verifyProjectId, (req, res) => {
    remove(req.params.id)
    .then(deletedProject => res.status(200).json(deletedProject))
    .catch(() => res.status(500).json({message: "Failed to delete target project"}))
})

module.exports = projectsRouter;