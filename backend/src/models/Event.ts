import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../utils/database.ts';
import User from './User.ts';
export default class Event extends Model {
	declare id: number;
	declare title: string;
	declare description: string | null;
	declare start: Date;
	declare end: Date;
	declare status: string;
	declare backgroundColor: string;
	declare userId: number;
	declare createdAt: Date;
	declare updatedAt: Date;
}

Event.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		start: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		end: {
			type: DataTypes.DATE,
			allowNull: true,
		},
		status: {
			type: DataTypes.STRING,
			defaultValue: 'confirmed',
			allowNull: false,
		},
		backgroundColor: {
			type: DataTypes.STRING(7), // for hex colors like #3B82F6
			defaultValue: '#3B82F6',
			allowNull: false,
		},
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'users',
				key: 'id',
			},
			onDelete: 'CASCADE',
		},
	},
	{
		sequelize,
		modelName: 'Event',
		tableName: 'events',
		timestamps: true,
	}
);

// Define associations
User.hasMany(Event, {
	foreignKey: 'userId',
	as: 'events',
});

Event.belongsTo(User, {
	foreignKey: 'userId',
	as: 'user',
});
