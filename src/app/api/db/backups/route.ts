import { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
  const backupDir = path.resolve(process.cwd(), 'db_backups');
  let files: string[] = [];
  if (fs.existsSync(backupDir)) {
    files = fs.readdirSync(backupDir).filter(f => f.endsWith('.sql'));
    files.sort((a, b) => b.localeCompare(a));
  }
  return Response.json({ files });
}
