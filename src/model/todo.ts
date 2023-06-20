import Status from "./status";

export default interface Todo {
    id?: string,
    name: string;
    description: string;
    status: Status
    createdAt?: Date,
    updatedAt?: Date,

}



