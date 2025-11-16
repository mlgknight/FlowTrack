import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize } from '../utils/database.ts';

export default class User extends Model {
  declare id: number;
  declare username: string;
  declare name: string | null;
  declare passwordHash: string | null;
  declare createdAt: Date;
  declare updatedAt: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    defaultScope: {
      attributes: { exclude: ['passwordHash'] },
    },
    scopes: {
      withPassword: {
        attributes: { include: ['passwordHash'] },
      },
    },
  }
);

User.prototype.toJSON = function () {
  const values = { ...this.get() };
  delete values.passwordHash;
  return values;
};