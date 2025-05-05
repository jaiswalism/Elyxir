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

// GET: List all purchases
export async function GET() {
  const conn = await getConnection();
  try {
    const [rows] = await conn.execute(
      `SELECT P_ID, Sup_ID, Med_ID, P_Qty, P_Cost, Pur_Date, Mfg_Date, Exp_Date FROM purchase`
    );
    return Response.json(rows);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  } finally {
    await conn.end();
  }
}

// POST: Add a new purchase
export async function POST(req: NextRequest) {
  const body = await req.json();
  const conn = await getConnection();
  try {
    await conn.execute(
      `INSERT INTO purchase (P_ID, Sup_ID, Med_ID, P_Qty, P_Cost, Pur_Date, Mfg_Date, Exp_Date)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        body.P_ID,
        body.Sup_ID,
        body.Med_ID,
        body.P_Qty,
        body.P_Cost,
        body.Pur_Date,
        body.Mfg_Date,
        body.Exp_Date,
      ]
    );
    return Response.json({ success: true });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 400 });
  } finally {
    await conn.end();
  }
}
