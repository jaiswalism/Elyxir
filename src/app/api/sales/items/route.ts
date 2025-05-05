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

// GET: /api/sales/items?saleId=410
export async function GET(req: NextRequest) {
  const saleId = req.nextUrl.searchParams.get('saleId');
  if (!saleId) {
    return Response.json({ error: 'Missing saleId' }, { status: 400 });
  }

  const conn = await getConnection();
  try {
    const [rows] = await conn.execute(
      `SELECT 
          si.Sale_ID as SALE_ID,
          si.Med_ID as MED_ID,
          si.Sale_Qty as SALE_QTY,
          si.Tot_Price as TOT_PRICE,
          m.Med_Name as MED_NAME,
          m.Med_Price as MED_PRICE
        FROM sales_items si
        LEFT JOIN meds m ON si.Med_ID = m.Med_ID
        WHERE si.Sale_ID = ?`,
      [saleId]
    );
    return Response.json(rows);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  } finally {
    await conn.end();
  }
}
