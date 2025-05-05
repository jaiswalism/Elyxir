import { NextRequest } from 'next/server';
import mysql from 'mysql2/promise';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });

    // Authenticate user
    const [loginRows] = await conn.execute<any[]>(
      'SELECT E_ID FROM emplogin WHERE E_Username = ? AND E_Password = ?',
      [username, password]
    );
    if (loginRows.length === 0) {
      await conn.end();
      return Response.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
    }
    const e_id = loginRows[0].E_ID;

    // Fetch designation and names
    const [empRows] = await conn.execute<any[]>(
      'SELECT Designation, E_Fname, E_Lname FROM employee WHERE E_ID = ?',
      [e_id]
    );
    await conn.end();

    if (empRows.length === 0) {
      return Response.json({ success: false, error: 'Employee not found' }, { status: 401 });
    }

    const { Designation, E_Fname, E_Lname } = empRows[0];

    return Response.json({
      success: true,
      user: {
        e_id,
        designation: Designation,
        e_fname: E_Fname,
        e_lname: E_Lname,
      }
    });
  } catch (error: any) {
    console.error('Login error:', error);
    return Response.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
