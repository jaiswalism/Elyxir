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

// GET: Get a purchase by P_ID and Med_ID (medId as query param)
export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const pId = context.params.id;
  const medId = req.nextUrl.searchParams.get('medId');
  if (!medId) {
    return Response.json({ error: 'medId query parameter is required.' }, { status: 400 });
  }
  const conn = await getConnection();
  try {
    const [rows] = await conn.execute(
      'SELECT P_ID, Sup_ID, Med_ID, P_Qty, P_Cost, Pur_Date, Mfg_Date, Exp_Date FROM purchase WHERE P_ID = ? AND Med_ID = ?',
      [pId, medId]
    );
    if ((rows as any[]).length === 0) {
      return Response.json({ error: 'Purchase not found' }, { status: 404 });
    }
    return Response.json((rows as any[])[0]);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  } finally {
    await conn.end();
  }
}

// PUT: Update a purchase by P_ID and Med_ID (medId as query param)
export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const pId = context.params.id;
  const medId = req.nextUrl.searchParams.get('medId');
  if (!medId) {
    return Response.json({ error: 'medId query parameter is required.' }, { status: 400 });
  }
  const body = await req.json();
  const conn = await getConnection();
  try {
    await conn.execute(
      `UPDATE purchase SET
        Sup_ID = ?,
        Med_ID = ?,
        P_Qty = ?,
        P_Cost = ?,
        Pur_Date = ?,
        Mfg_Date = ?,
        Exp_Date = ?
      WHERE P_ID = ? AND Med_ID = ?`,
      [
        body.Sup_ID,
        body.Med_ID,
        body.P_Qty,
        body.P_Cost,
        body.Pur_Date,
        body.Mfg_Date,
        body.Exp_Date,
        pId,
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

// DELETE: Remove a purchase by P_ID and Med_ID (medId as query param)
export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const pId = context.params.id;
  const medId = req.nextUrl.searchParams.get('medId');
  if (!medId) {
    return Response.json({ error: 'medId query parameter is required.' }, { status: 400 });
  }
  const conn = await getConnection();
  try {
    await conn.execute(
      'DELETE FROM purchase WHERE P_ID = ? AND Med_ID = ?',
      [pId, medId]
    );
    return Response.json({ success: true });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 400 });
  } finally {
    await conn.end();
  }
}
