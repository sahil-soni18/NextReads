import { DataTypes, Model, Optional } from "sequelize";
import connectToDatabase from "../lib/dbConnect";

const sequelize = connectToDatabase();


interface UserAttributes {
  _id: number;
  username: string;
  email: string;
  password: string;
}



// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface UserCreationAttributes extends Optional<UserAttributes, '_id'> {}


class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public _id!: number;
  public username!: string;
  public email!: string;
  public password!: string;


  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

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

export default User;
