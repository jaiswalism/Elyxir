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

// GET: List all sold medicines aggregated
export async function GET(req: NextRequest) {
  const conn = await getConnection();
  try {
    const [rows] = await conn.execute(
      `SELECT 
        si.Med_ID as MED_ID,
        m.Med_Name as MED_NAME,
        SUM(si.Sale_Qty) as TOTAL_QTY_SOLD,
        m.Med_Price as MED_PRICE
      FROM sales_items si
      JOIN meds m ON si.Med_ID = m.Med_ID
      GROUP BY si.Med_ID, m.Med_Name, m.Med_Price
      ORDER BY TOTAL_QTY_SOLD DESC`
    );
    return Response.json(rows);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  } finally {
    await conn.end();
  }
}
