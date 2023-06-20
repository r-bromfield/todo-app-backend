import { Schema, model } from "mongoose";
import Todo from "../model/todo";
import Status from "../model/status";

const TodoSchema = new Schema<Todo>({
    name: { type: 'String', required: true },
    description: { type: 'String', required: true },
    status: { type: 'String', required: true, enum: Status }

}, { timestamps: true, id: true })

TodoSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
}
)

const TodoRepository = model('Todo', TodoSchema);

export default TodoRepository;