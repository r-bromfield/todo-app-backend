import dotenv from 'dotenv'
import app from "./app";
import DatabaseService from "./service/database.service";

dotenv.config();

const port = process.env.PORT ?? 8083;
const databaseService = new DatabaseService();
// Database
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

// Server Start
app.listen(port, async () => {
  await databaseService.connectToDatabase(DB_HOST, DB_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD)
    .then(() => {
      console.log('Database connection successfully established')
    })
    .catch((err) => {
      console.error(err)    
    });
  console.log(`Server listening at http://localhost:${port}`);
});