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

export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams.get('search');
  const conn = await getConnection();
  try {
    let query = `SELECT 
      Med_ID as Med_ID,
      Med_Name as Med_Name,
      Med_Qty as Med_Qty,
      Category as Category,
      Med_Price as Med_Price,
      Location_Rack as Location_Rack
      FROM meds`;
    let params: any[] = [];
    if (search && search.trim()) {
      query += ` WHERE (
        Med_Name LIKE ? OR 
        Category LIKE ? OR 
        Location_Rack LIKE ?
      )`;
      params = [`%${search}%`, `%${search}%`, `%${search}%`];
    }
    const [rows] = await conn.execute(query, params);
    return Response.json(rows);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  } finally {
    await conn.end();
  }
}
