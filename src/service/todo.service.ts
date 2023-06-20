import { CustomError } from "../exception";
import Todo from "../model/todo";
import TodoRepository from './../repository/todo.repository';

/**
 * Handles Todo business logic
 */
export default class TodoService {

    private todoRepository: typeof TodoRepository;

    constructor() {
        this.todoRepository = TodoRepository;
    }

    async save(todo: Todo): Promise<void> {
        try {
            await this.todoRepository.create({
                name: todo.name,
                description: todo.description,
                status: todo.status
            });

        } catch (err) {
            console.error(err)
            throw new CustomError('Todo save failed')
        }
    }


    async update(id: string, todo: Todo): Promise<void> {
        try {

            const filter = { _id: id }
            const updateQuery = { name: todo.name, description: todo.description, status: todo.status }

            const result = await this.todoRepository.updateOne(filter, updateQuery)

            if (result.matchedCount == 0) {
                throw new Error("Todo not found")
            }
            return

        } catch (err) {
            console.error(err)
            throw new CustomError('Todo update failed')

        }

    }

    async delete(id: string): Promise<void> {
        try {
            const filter = { _id:id }
            await this.todoRepository.deleteOne(filter)

        } catch (err: any) {
            console.error(err)
            throw new CustomError('Todo deletion failed')
        }

    }

    async getById(id: string): Promise<Todo | null> {
        try {
            return await this.todoRepository.findById(id)

        } catch (err) {
            console.error(err)
            throw new CustomError('Todo retrieval failed', 404)
        }

    }


    async getAll(): Promise<Todo[]> {
        try {
            return await this.todoRepository.find().sort({'updatedAt':'desc'})
        } catch (err) {
            console.error(err)
            throw new CustomError('Todo list retrieval failed')
        }

    }



}