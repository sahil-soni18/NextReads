
import { Model, DataTypes, Optional } from 'sequelize';
import connectToDatabase from "../lib/dbConnect";

const sequelize = connectToDatabase();

interface BookAttributes {
  id: number;
  title: string;
  author: string;
  description?: string;
  downloadLink?: string;
  readLink?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface BookCreationAttributes extends Optional<BookAttributes, 'id' | 'description' | 'downloadLink' | 'readLink'> {}

class Book extends Model<BookAttributes, BookCreationAttributes> implements BookAttributes {
  public id!: number;
  public title!: string;
  public author!: string;
  public description?: string;
  public downloadLink?: string;
  public readLink?: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    downloadLink: {
      type: DataTypes.STRING(2048),
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
    readLink: {
      type: DataTypes.STRING(2048),
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
  },
  {
    sequelize, 
    modelName: 'Book',
    tableName: 'books',
    timestamps: true,
  }
);

export default Book;
