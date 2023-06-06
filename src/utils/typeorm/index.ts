import { User } from './entities/User';
import { Session } from './entities/Session';
import { DataSource } from 'typeorm';

const entities = [
    User,
    Session,
];

const appDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    entities,
});

export { User, Session, appDataSource };

export default entities;