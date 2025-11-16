import { Sequelize } from 'sequelize';
import logger from './logger.ts';

const sequelize = new Sequelize(process.env.DATABASE_URL || '', {
	dialect: 'postgres',
	logging: true,
});

const connectPostgres = async () => {
	try {
		await sequelize.authenticate();
		logger.info('PostgreSQL connection established successfully');

		await sequelize.sync({
			force: process.env.NODE_ENV === 'development', // Only in dev!
		});
		logger.info('Database tables synced');

		return sequelize;
	} catch (error) {
		logger.error('Unable to connect to PostgreSQL:', error);
		throw error;
	}
};

const connectDB = async () => {
	try {
		await connectPostgres();

		logger.info('Database(s) connected');
	} catch (error) {
		logger.error('Database connection failed:', error);
		process.exit(1);
	}
};

export { sequelize };
export default connectDB;
