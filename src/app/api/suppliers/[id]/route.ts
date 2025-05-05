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

// GET: Get supplier by ID
export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = await context.params;
  const supId = id;
  const conn = await getConnection();
  try {
    const [rows] = await conn.execute(
      'SELECT Sup_ID, Sup_Name, Sup_Phone, Sup_Mail, Sup_Add FROM suppliers WHERE Sup_ID = ?',
      [supId]
    );
    if ((rows as any[]).length === 0) {
      return Response.json({ error: 'Supplier not found' }, { status: 404 });
    }
    return Response.json((rows as any[])[0]);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  } finally {
    await conn.end();
  }
}

// PUT: Update supplier by ID
export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = await context.params;
  const supId = id;
  const body = await req.json();
  const conn = await getConnection();
  try {
    await conn.execute(
      'UPDATE suppliers SET Sup_Name = ?, Sup_Phone = ?, Sup_Mail = ?, Sup_Add = ? WHERE Sup_ID = ?',
      [
        body.Sup_Name,
        body.Sup_Phone,
        body.Sup_Mail,
        body.Sup_Add,
        supId,
      ]
    );
    return Response.json({ success: true });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 400 });
  } finally {
    await conn.end();
  }
}

// DELETE: Remove supplier by ID
export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = await context.params;
  const supId = id;
  const conn = await getConnection();
  try {
    await conn.execute('DELETE FROM suppliers WHERE Sup_ID = ?', [supId]);
    return Response.json({ success: true });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 400 });
  } finally {
    await conn.end();
  }
}
