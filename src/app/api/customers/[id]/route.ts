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

// GET: Get a single customer by ID
export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id: customerId } = await context.params;
  const conn = await getConnection();
  try {
    const [rows] = await conn.execute(
      'SELECT C_ID, C_Fname, C_Lname, C_Age, C_Gender, C_Phone, C_Mail FROM customer WHERE C_ID = ?',
      [customerId]
    );
    if ((rows as any[]).length === 0) {
      return Response.json({ error: 'Customer not found' }, { status: 404 });
    }
    return Response.json((rows as any[])[0]);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  } finally {
    await conn.end();
  }
}

// PUT: Update a customer by ID
export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id: customerId } = await context.params;
  const body = await req.json();
  const conn = await getConnection();
  try {
    await conn.execute(
      `UPDATE customer SET
        C_Fname = ?,
        C_Lname = ?,
        C_Age = ?,
        C_Gender = ?,
        C_Phone = ?,
        C_Mail = ?
      WHERE C_ID = ?`,
      [
        body.C_Fname,
        body.C_Lname,
        body.C_Age,
        body.C_Gender,
        body.C_Phone,
        body.C_Mail,
        customerId,
      ]
    );
    return Response.json({ success: true });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 400 });
  } finally {
    await conn.end();
  }
}
