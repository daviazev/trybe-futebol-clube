import { Model, INTEGER, STRING } from 'sequelize';

import db from '.';

class Teams extends Model {
  declare id: number;
  declare teamName: string;
}

Teams.init({
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  teamName: {
    type: STRING,
    allowNull: false,
    unique: true,
  },
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
  tableName: 'teams',
  modelName: 'Teams',
});
