import pool from './db';

export async function getData() {
    try {
        const res = await pool.query('SELECT * FROM "test"');
        return res.rows;
    } catch (error) {
        console.error(error);
        return [];
    }
}

