import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class User extends Model {
  declare id: number;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

User.init({
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  username: STRING,
  role: STRING,
  email: {
    type: STRING,
    unique: true,
  },
  password: STRING,
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
  tableName: 'users',
  modelName: 'User',
});

export default User;
