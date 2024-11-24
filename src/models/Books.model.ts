
import { Model, DataTypes, Optional } from 'sequelize';
import {connectToDatabase} from "../lib/dbConnect";

const sequelize = connectToDatabase();

interface BookAttributes {
  id: number;
  title: string;
  author: string;
  description?: string;
  publishYear?: string;
  pdfPath?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface BookCreationAttributes extends Optional<BookAttributes, 'id' | 'description' | 'publishYear' | 'pdfPath' > {}

class Book extends Model<BookAttributes, BookCreationAttributes> implements BookAttributes {
  public id!: number;
  public title!: string;
  public author!: string;
  public description?: string;
  public publishYear?: string;
  public pdfPath!: string; 


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
    publishYear: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pdfPath: {
      type: DataTypes.STRING, // Store the relative path to the PDF file
      allowNull: false,
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
