import { NextRequest } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const { fileName } = await req.json();
  const backupDir = path.resolve(process.cwd(), 'db_backups');
  const filePath = path.join(backupDir, fileName);

  if (!fs.existsSync(filePath)) {
    return Response.json({ success: false, error: 'Backup file not found' }, { status: 400 });
  }

  // Use the full path to mysql.exe
  const mysqlPath = 'C:/Program Files/MySQL/MySQL Server 8.4/bin/mysql.exe';

  return new Promise((resolve) => {
    const restore = spawn(mysqlPath, [
      '-u', process.env.DB_USER!,
      `-p${process.env.DB_PASS}`,
      process.env.DB_NAME!,
    ]);

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(restore.stdin);

    let errorMsg = '';
    restore.stderr.on('data', (data) => {
      errorMsg += data.toString();
    });

    restore.on('close', (code) => {
      if (code === 0) {
        resolve(Response.json({ success: true }));
      } else {
        resolve(Response.json({ success: false, error: errorMsg || 'Restore failed' }, { status: 500 }));
      }
    });

    restore.on('error', (err) => {
      resolve(Response.json({ success: false, error: err.message }, { status: 500 }));
    });
  });
}
