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

// GET: Get a single employee by E_ID, with age derived from Bdate
export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id: employeeId } = await context.params;
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
      FROM employee
      WHERE E_ID = ?`,
      [employeeId]
    );
    if ((rows as any[]).length === 0) {
      return Response.json({ error: 'Employee not found' }, { status: 404 });
    }
    return Response.json((rows as any[])[0]);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  } finally {
    await conn.end();
  }
}

// PUT: Update an employee by E_ID
export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id: employeeId } = await context.params;
  const body = await req.json();
  const conn = await getConnection();
  try {
    await conn.execute(
      `UPDATE employee SET
        E_Fname = ?,
        E_Lname = ?,
        Bdate = ?,
        E_Gender = ?,
        E_Type = ?,
        E_Jdate = ?,
        E_Sal = ?,
        E_Phone = ?,
        E_Mail = ?,
        E_Add = ?,
        Designation = ?
      WHERE E_ID = ?`,
      [
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
        employeeId,
      ]
    );
    return Response.json({ success: true });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 400 });
  } finally {
    await conn.end();
  }
}

// DELETE: Remove employee by E_ID
export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id: employeeId } = await context.params;
  const conn = await getConnection();
  try {
    await conn.execute('DELETE FROM employee WHERE E_ID = ?', [employeeId]);
    return Response.json({ success: true });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 400 });
  } finally {
    await conn.end();
  }
}
