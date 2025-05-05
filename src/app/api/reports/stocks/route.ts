import { NextRequest } from 'next/server';
import mysql from 'mysql2/promise';

async function getConnection() {
  return await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });
}

// GET: Medicines with low stock (≤ 50)
export async function GET() {
  const conn = await getConnection();
  try {
    const [rows] = await conn.execute(
      `SELECT Med_ID, Med_Name, Med_Qty, Category, Med_Price, Location_Rack
       FROM meds
       WHERE Med_Qty <= 50
       ORDER BY Med_Qty ASC`
    );
    return Response.json(rows);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  } finally {
    await conn.end();
  }
}
