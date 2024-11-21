import { Sequelize } from "sequelize";

let sequelize: Sequelize;

export const connectToDatabase = (): Sequelize => {
  if (!sequelize) {
    const dbUri = process.env.POSTGRES_URI || "postgres://postgres:myPostgres@localhost:5432/BoringBook";

    sequelize = new Sequelize(dbUri, {
      dialect: "postgres", // Ensure correct dialect is specified
      logging: false, // Disable logging for cleaner output
    });
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
    console.error("Unable to connect to the database:", error);
    throw error;
  }
};
