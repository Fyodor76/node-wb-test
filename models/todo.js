import { Model, DataTypes } from 'sequelize';
import {sequelize} from '../database.js'; 

export class Todo extends Model {}

Todo.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  sequelize,
  modelName: 'Todo',
  tableName: 'Todos'  // Указание конкретного имени таблицы
});


