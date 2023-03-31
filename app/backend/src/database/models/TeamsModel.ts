import { Model, STRING, INTEGER } from 'sequelize';
import db from '.';

class Teams extends Model {
  declare id: number;
  declare teamName: string;
}

Teams.init({
  id: {
    autoIncrement: true,
    allowNull: false,
    type: INTEGER,
    primaryKey: true,
  },
  teamName: {
    allowNull: false,
    type: STRING,

  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

export default Teams;
