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

// GET: List all customers
export async function GET() {
  const conn = await getConnection();
  try {
    // Use correct column names and casing as in your table!
    const [rows] = await conn.execute(
      'SELECT C_ID, C_Fname, C_Lname, C_Age, C_Gender, C_Phone, C_Mail FROM customer'
    );
    return Response.json(rows);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  } finally {
    await conn.end();
  }
}

// POST: Add a new customer
export async function POST(req: NextRequest) {
  const body = await req.json();
  const conn = await getConnection();
  try {
    await conn.execute(
      'INSERT INTO customer (C_ID, C_Fname, C_Lname, C_Age, C_Gender, C_Phone, C_Mail) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        body.C_ID,
        body.C_Fname,
        body.C_Lname,
        body.C_Age,
        body.C_Gender,
        body.C_Phone,
        body.C_Mail,
      ]
    );
    return Response.json({ success: true });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 400 });
  } finally {
    await conn.end();
  }
}
