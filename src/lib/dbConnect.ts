import { Sequelize } from 'sequelize';
// import dotenv from 'dotenv';
// dotenv.config();


let sequelize: Sequelize | null = null;

const connectToDatabase = (): Sequelize => {
  if (!sequelize) {
    sequelize = new Sequelize(process.env.POSTGRES_URI  || "postgres://postgres:myPostgres@localhost:5432/BoringBook", {
      dialect: 'postgres', // Specify the database dialect
      logging: false, // Disable logging in production
    });
    console.log('New Sequelize instance created');
  } else {
    console.log('Using existing Sequelize instance');
  }
  return sequelize;
};

// Test connection function
const testConnection = async () => {
  try {
    const db = connectToDatabase();
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1); // Graceful exit on failure
  }
};

testConnection();

export default connectToDatabase;
