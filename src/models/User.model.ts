import { DataTypes, Model } from "sequelize";
import connectToDatabase from "../lib/dbConnect";

const sequelize = connectToDatabase();

class User extends Model {}

User.init(
  {
    _id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
    timestamps: true,
  }
);
