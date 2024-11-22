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
      dialect: "postgres", // Ensure the correct dialect is specified
      dialectModule: pg,
      logging: false, // Optional: Disable SQL query logging
    });

    // (async () => {
    //   try {
    //     await sequelize.authenticate();
    //     console.log("Database connection successful!");
    //   } catch (error) {
    //     console.error("Database connection failed:", error.message);
    //   }
    // })();

  }

  return sequelize;
};

// Test the connection
export const testConnection = async () => {
  try {
    const db = connectToDatabase();
    await db.authenticate();
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
    throw error;
  }
};
