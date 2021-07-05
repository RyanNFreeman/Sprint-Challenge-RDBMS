const express = require('express');
const knex = require('knex');
const dbConfig = require('./knexfile');
const helmet=require('helmet')

const db = require('./data/dbConfig');
const URL = 5000

const server = express();

server.use(express.json());
server.use(helmet())

server.post('/api/projects', (req, res) => {
    const newProject = req.body;
    const {name, description, completed} = newProject
    name && description && (completed === true || completed === false) ?
    db.insert(newProject)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(err => {
            res.status(500).json({error: 'There was an error while saving the project to the database'})
        })
    : res
    .status(400)
    .json({ error: 'Please provide a name and a description for project'})
})

server.post('/api/actions', (req, res) => {
    const newAction = req.body;
    const {project_id, description, notes, completed} = newAction
    if(project_id && description && notes && (completed === true || completed === false) )
    {db.insert(newAction)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(err => {
            res.status(500).json({error: 'There was an error while saving the action to the database'})
        })} else {
    res.status(400).json({ error: 'Request must provide a project id, description, notes field, as well as if it\'s been completed' })}
})

server.get('/api/projects/:id', async (req, res) => {
    const { id } = req.params;
  
     try {
      const project = await db('projects').where('id', id).first();
      const actions = await db('actions').where('project_id', id);
      const projectActions = {
        id: project.id,
        name: project.name,
        description: project.description,
        completed: project.completed === 0 ? false : true,
        actions: actions.map(action => {
          return {
            id: action.id,
            description: action.description,
            notes: action.notes,
            complete: action.completed === 0 ? false : true
          }
        })
      }
      res.status(200).json(projectActions);
    } catch (e) {
      res.status(500).json({error: "Something went wrong with the server."});
    }
})


server.listen(URL, () => {
  console.log(`Server is running on Port: ${URL}`);
})