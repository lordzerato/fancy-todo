const { Todo } = require('../models')

module.exports = class TodoController {
    static getTodo(req, res) {
        Todo.findAll({
            attributes: {
                exclude: [ 'createdAt', 'updatedAt' ]
            }
        })
        .then( data => {
            return res.status(200).json(data)
        } )
        .catch( err => {
            return res.status(500).json({ message: 'Internal server error' })
        } )
    }

    static createTodo(req, res) {
        const newData = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        Todo.create(newData)
        .then( data => {
            const response = {
                title: data.title,
                description: data.description,
                status: data.status,
                due_date: data.due_date
            }
            return res.status(201).json(response)
        } )
        .catch( err => {
            return res.status(400).json(err)
        } )
    }

    static removeTodo(req, res) {
        Todo.destroy( {
            where: {
                id: req.params.id
            }
        } )
        .then( data => {
            if (data === 1) {
                return res.status(200).json({ message: 'Todo has been deleted' })
            } else {
                return res.status(404).json({ message: 'Todo not found' })
            }
        } )
        .catch( err => {
            return res.status(500).json({ message: 'Internal server error' })
        } )
    }
}