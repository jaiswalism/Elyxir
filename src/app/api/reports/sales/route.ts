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

// GET: List all sales, optionally filtered by date range
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const from = url.searchParams.get('from');
  const to = url.searchParams.get('to');
  const conn = await getConnection();
  try {
    let query = 'SELECT Sale_ID, S_Date, S_Time, C_ID, E_ID, Total_Amt FROM sales';
    const params: any[] = [];
    if (from && to) {
      query += ' WHERE S_Date BETWEEN ? AND ?';
      params.push(from, to);
    }
    query += ' ORDER BY S_Date DESC, S_Time DESC';
    const [rows] = await conn.execute(query, params);
    return Response.json(rows);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  } finally {
    await conn.end();
  }
}
