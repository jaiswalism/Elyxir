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

// GET: List all sales
export async function GET() {
  const conn = await getConnection();
  try {
    const [rows] = await conn.execute(
      `SELECT 
         Sale_ID as SALE_ID,
         S_Date as S_DATE,
         S_Time as S_TIME,
         Total_Amt as TOTAL_AMT,
         C_ID,
         E_ID
       FROM sales
       ORDER BY Sale_ID DESC`
    );
    return Response.json(rows);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  } finally {
    await conn.end();
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { customerId, items, employeeId } = body;

  // Validate input, including employeeId
  if (
    !customerId ||
    isNaN(Number(customerId)) ||
    !Array.isArray(items) ||
    items.length === 0 ||
    items.some(
      item =>
        !item.medId ||
        isNaN(Number(item.medId)) ||
        !item.qty ||
        isNaN(Number(item.qty)) ||
        item.price === undefined ||
        isNaN(Number(item.price))
    ) ||
    !employeeId ||
    isNaN(Number(employeeId))
  ) {
    return Response.json({ error: 'Missing or invalid customer, items, or employee.' }, { status: 400 });
  }

  const conn = await getConnection();
  try {
    const totalAmt = items
      .reduce((sum, item) => sum + Number(item.price) * Number(item.qty), 0)
      .toFixed(2);

    const now = new Date();
    const s_date = now.toISOString().slice(0, 10);
    const s_time = now.toTimeString().slice(0, 8);

    const [saleResult]: any = await conn.execute(
      `INSERT INTO sales (S_Date, S_Time, Total_Amt, C_ID, E_ID)
       VALUES (?, ?, ?, ?, ?)`,
      [s_date, s_time, totalAmt, Number(customerId), Number(employeeId)]
    );

    const saleId = saleResult.insertId;

    for (const item of items) {
      await conn.execute(
        `INSERT INTO sales_items (Sale_ID, Med_ID, Sale_Qty, Tot_Price)
         VALUES (?, ?, ?, ?)`,
        [
          saleId,
          Number(item.medId),
          Number(item.qty),
          (Number(item.price) * Number(item.qty)).toFixed(2),
        ]
      );
    }

    return Response.json({ success: true, saleId });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 400 });
  } finally {
    await conn.end();
  }
}
