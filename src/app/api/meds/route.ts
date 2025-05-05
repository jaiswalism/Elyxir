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

// GET: List all medicines
export async function GET() {
  const conn = await getConnection();
  try {
    const [rows] = await conn.execute<any[]>(
      'SELECT Med_ID, Med_Name, Med_Qty, Category, Med_Price, Location_Rack FROM meds'
    );
    return Response.json(rows);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  } finally {
    await conn.end();
  }
}

// POST: Add a new medicine
export async function POST(req: NextRequest) {
  const body = await req.json();
  const conn = await getConnection();
  try {
    await conn.execute(
      'INSERT INTO meds (Med_ID, Med_Name, Med_Qty, Category, Med_Price, Location_Rack) VALUES (?, ?, ?, ?, ?, ?)',
      [
        body.Med_ID,
        body.Med_Name,
        body.Med_Qty,
        body.Category,
        body.Med_Price,
        body.Location_Rack,
      ]
    );
    return Response.json({ success: true });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 400 });
  } finally {
    await conn.end();
  }
}
