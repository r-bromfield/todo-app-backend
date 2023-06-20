import { NextFunction, Request, Response, Router } from "express";
import TodoService from '../service/todo.service';
import Todo from "../model/todo";
import MessageResponse from "../model/message-response";

const todoController = Router();
const todoService = new TodoService();


todoController.post<{}, MessageResponse, Todo>('/', (req: Request, res: Response, next: NextFunction) => {
    const todo = req.body as Todo

    if (!todo.name || !todo.description || !todo.status) {
        const missing = [];
        if (!todo.name) {
            missing.push('name')
        }
        if (!todo.description) {
            missing.push('description')
        }
        if (!todo.status) {
            missing.push('status')
        }
        res.status(400).json({ message: `The following is missing: ${missing.join(', ')}` })
    } else {

        todoService.save(todo).then(() => {
            res.json({ message: 'Todo Saved Successfully' })
        }).catch(err => next(err))
    }

})
todoController.delete<{}>('/:id', (req: Request, res: Response, next: NextFunction) => {
    const id = req.params?.id

    todoService.delete(id).then(() => {
        res.json({ message: 'Todo Deleted Successfully' })
    }).catch(err => next(err))
})

todoController.put<{}, MessageResponse, Todo>('/:id', (req: Request, res: Response, next: NextFunction) => {
    const id = req.params?.id
    const todo = req.body

    console.log({ id, todo })


    if (!todo.name || !todo.description || !todo.status || !id) {
        const missing = [];
        if (!id) {
            missing.push('id')
        }
        if (!todo.name) {
            missing.push('name')
        }
        if (!todo.description) {
            missing.push('description')
        }
        if (!todo.status) {
            missing.push('status')
        }
        res.status(400).json({ message: `The following is missing: ${missing.join(', ')}` })
    } else {
        todoService.update(id, todo).then(() => {
            res.json({ message: 'Todo Updated Successfully' })
        }).catch(err => next(err))
    }
})



todoController.get<{}>('/:id', (req: Request, res: Response, next: NextFunction) => {
    const id = req.params?.id

    todoService.getById(id).then(todo => {
        res.json(todo)
    }).catch(err => next(err))

})


todoController.get('/', (req: Request, res: Response, next: NextFunction) => {

    todoService.getAll().then(todoList => {
        res.json(todoList)
    }).catch(err => next(err))

})



export default todoController