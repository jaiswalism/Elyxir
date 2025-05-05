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
      C_ID,
      C_Fname as C_FNAME,
      C_Lname as C_LNAME,
      C_Phone as C_PHNO
      FROM customer`;
    let params: any[] = [];
    if (search && search.trim()) {
      query += ` WHERE 
        C_Fname LIKE ? OR 
        C_Lname LIKE ? OR 
        C_Phone LIKE ? OR 
        CAST(C_ID AS CHAR) LIKE ?`;
      params = [`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`];
    }
    const [rows] = await conn.execute(query, params);
    return Response.json(rows);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  } finally {
    await conn.end();
  }
}
