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

// GET: Purchases expiring within 6 months
export async function GET() {
  const conn = await getConnection();
  try {
    const [rows] = await conn.execute(
      `SELECT P_ID, Sup_ID, Med_ID, P_Qty, P_Cost, Pur_Date, Mfg_Date, Exp_Date
       FROM purchase
       WHERE Exp_Date BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 6 MONTH)
       ORDER BY Exp_Date ASC`
    );
    return Response.json(rows);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  } finally {
    await conn.end();
  }
}
