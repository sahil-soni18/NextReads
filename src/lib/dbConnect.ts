import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import pg from "pg";

dotenv.config(); // Load .env variables

let sequelize: Sequelize;

export const connectToDatabase = (): Sequelize => {
  if (!sequelize) {
    const dbUri = process.env.POSTGRES_URI;

    if (!dbUri) {
      throw new Error("POSTGRES_URI environment variable is not set!");
    }

    console.log(`Connecting to database with URI: ${dbUri}`);

    sequelize = new Sequelize(dbUri, {
      dialect: "postgres",
      dialectModule: pg,
      logging: console.log,  // Enable logging to see SQL queries in the console
    });
  }

  return sequelize;
};

export const testConnection = async () => {
  try {
    const db = connectToDatabase();
    await db.authenticate(); // Test database connection
    console.log("Database connected successfully!");

    // Sync models to create tables
    // Use force: true to drop and recreate the tables for testing
    await db.sync({ force: true });  // Will drop tables and recreate them
    console.log("Tables synchronized successfully!");

  } catch (error) {
    console.error("Unable to connect to the database:", (error as Error).message);
    throw error;
  }
};
