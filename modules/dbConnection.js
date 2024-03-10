// dbConnection.js

const mongoose = require('mongoose');
mongoose.Promise = global.Promise; // Use native promises

let database = null;

async function connectToDatabase(serviceName) {
  if (database) {
    return database;
  }
  try {
    database = await mongoose.createConnection("mongodb+srv://r4a_admin:kxGoJtwA8WdlNF6v@roof4all.cwys7ka.mongodb.net/?retryWrites=true&w=majority&appName=roof4all");
    database.on("error", console.error.bind(console, "MongoDB connection error:"));
    console.log(`Connection Successful: ${serviceName} connected to MongoDB`);
  } catch (error) {
    console.error("Could not connect to MongoDB", error);
    process.exit(1); // Exit the process with an error code
  }

  return database;
}

module.exports = { connectToDatabase, mongoose };