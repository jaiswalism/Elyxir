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

// GET: Get a single medicine by Med_ID
export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id: medId } = await context.params;
  const conn = await getConnection();
  try {
    const [rows] = await conn.execute(
      'SELECT Med_ID, Med_Name, Med_Qty, Category, Med_Price, Location_Rack FROM meds WHERE Med_ID = ?',
      [medId]
    );
    if ((rows as any[]).length === 0) {
      return Response.json({ error: 'Medicine not found' }, { status: 404 });
    }
    return Response.json((rows as any[])[0]);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  } finally {
    await conn.end();
  }
}

// PUT: Update a medicine by Med_ID
export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id: medId } = await context.params;
  const body = await req.json();
  const conn = await getConnection();
  try {
    await conn.execute(
      `UPDATE meds SET
        Med_Name = ?,
        Med_Qty = ?,
        Category = ?,
        Med_Price = ?,
        Location_Rack = ?
      WHERE Med_ID = ?`,
      [
        body.Med_Name,
        body.Med_Qty,
        body.Category,
        body.Med_Price,
        body.Location_Rack,
        medId,
      ]
    );
    return Response.json({ success: true });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 400 });
  } finally {
    await conn.end();
  }
}

// DELETE: Remove a medicine by Med_ID
export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id: medId } = await context.params;
  const conn = await getConnection();
  try {
    await conn.execute('DELETE FROM meds WHERE Med_ID = ?', [medId]);
    return Response.json({ success: true });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 400 });
  } finally {
    await conn.end();
  }
}
