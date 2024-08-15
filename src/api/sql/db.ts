import { Pool } from 'pg';

/**
 * This creates a new pool of connections to the database.
 * It uses the credentials of the local database.
 * These varaibles should be stored in a .env file.
 */

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'admin',
    password: 'password123',
    database: 'postgres'
});

export default pool;