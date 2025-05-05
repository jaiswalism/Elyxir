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

// GET: List all suppliers
export async function GET() {
  const conn = await getConnection();
  try {
    const [rows] = await conn.execute(
      'SELECT Sup_ID, Sup_Name, Sup_Phone, Sup_Mail, Sup_Add FROM suppliers'
    );
    return Response.json(rows);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  } finally {
    await conn.end();
  }
}

// POST: Add a new supplier
export async function POST(req: NextRequest) {
  const body = await req.json();
  const conn = await getConnection();
  try {
    await conn.execute(
      'INSERT INTO suppliers (Sup_ID, Sup_Name, Sup_Phone, Sup_Mail, Sup_Add) VALUES (?, ?, ?, ?, ?)',
      [
        body.Sup_ID,
        body.Sup_Name,
        body.Sup_Phone,
        body.Sup_Mail,
        body.Sup_Add,
      ]
    );
    return Response.json({ success: true });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 400 });
  } finally {
    await conn.end();
  }
}
