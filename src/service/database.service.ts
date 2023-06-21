import mongoose from 'mongoose';

export default class DatabaseService {
    constructor() {}

    /**
     * Establishes a connection to the database
     * @param host 
     * @param databaseName 
     * @param username 
     * @param password 
     * @returns database connection
     */
    connectToDatabase(host?: string, databaseName?: string, username?: string, password?: string) {
        return mongoose.connect(`${host}/${databaseName}`, { user: username, pass: password })
    }
}