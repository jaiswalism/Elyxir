import { NextRequest } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

export const dynamic = 'force-dynamic';

export async function POST() {
  const backupDir = path.resolve(process.cwd(), 'db_backups');
  if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir);

  const fileName = `pharmacy_record_backup_${Date.now()}.sql`;
  const filePath = path.join(backupDir, fileName);

  return new Promise((resolve) => {
    const dump = spawn('C:/Program Files/MySQL/MySQL Server 8.4/bin/mysqldump.exe', [
      '-u', process.env.DB_USER!,
      `-p${process.env.DB_PASS}`,
      process.env.DB_NAME!,
    ]);

    const writeStream = fs.createWriteStream(filePath);
    dump.stdout.pipe(writeStream);

    dump.on('close', (code) => {
      if (code === 0) {
        resolve(Response.json({ success: true, fileName }));
      } else {
        resolve(Response.json({ success: false, error: 'Backup failed' }, { status: 500 }));
      }
    });

    dump.on('error', (err) => {
      resolve(Response.json({ success: false, error: err.message }, { status: 500 }));
    });
  });
}
