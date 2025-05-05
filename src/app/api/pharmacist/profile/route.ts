import { NextRequest } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET(req: NextRequest) {
  const e_id = req.nextUrl.searchParams.get('e_id');
  if (!e_id) return Response.json({ error: 'Missing e_id' }, { status: 400 });

  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });

  try {
    const [rows] = await conn.execute(
      `SELECT E_Fname, E_Lname, Designation FROM employee WHERE E_ID = ?`,
      [e_id]
    );
    if ((rows as any[]).length === 0)
      return Response.json({ error: 'Not found' }, { status: 404 });
    const emp = (rows as any[])[0];
    return Response.json({
      E_ID: e_id,
      E_Fname: emp.E_Fname,
      E_Lname: emp.E_Lname,
      Designation: emp.Designation,
    });
  } finally {
    await conn.end();
  }
}
