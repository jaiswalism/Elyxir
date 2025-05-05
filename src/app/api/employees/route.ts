import { NextRequest } from 'next/server';
import mysql from 'mysql2/promise';

// Utility to get a MySQL connection
async function getConnection() {
  return await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });
}

// GET: List all employees with age derived from Bdate
export async function GET() {
  const conn = await getConnection();
  try {
    const [rows] = await conn.execute(
      `SELECT
        E_ID,
        E_Fname,
        E_Lname,
        Bdate,
        TIMESTAMPDIFF(YEAR, Bdate, CURDATE()) AS E_Age,
        E_Gender,
        E_Type,
        E_Jdate,
        E_Sal,
        E_Phone,
        E_Mail,
        E_Add,
        Designation
      FROM employee`
    );
    return Response.json(rows);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  } finally {
    await conn.end();
  }
}

// POST: Add a new employee
export async function POST(req: NextRequest) {
  const body = await req.json();
  const conn = await getConnection();
  try {
    await conn.execute(
      `INSERT INTO employee (
        E_ID, E_Fname, E_Lname, Bdate, E_Gender, E_Type, E_Jdate, E_Sal, E_Phone, E_Mail, E_Add, Designation
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        body.E_ID,
        body.E_Fname,
        body.E_Lname,
        body.Bdate,
        body.E_Gender,
        body.E_Type,
        body.E_Jdate,
        body.E_Sal,
        body.E_Phone,
        body.E_Mail,
        body.E_Add,
        body.Designation,
      ]
    );
    return Response.json({ success: true });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 400 });
  } finally {
    await conn.end();
  }
}
