import { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function DELETE(
  req: NextRequest,
  context: { params: { file: string } }
) {
  const { file } = await context.params;
  const backupDir = path.resolve(process.cwd(), 'db_backups');
  const filePath = path.join(backupDir, file);

  if (!fs.existsSync(filePath)) {
    return Response.json({ success: false, error: 'File not found' }, { status: 404 });
  }
  try {
    fs.unlinkSync(filePath);
    return Response.json({ success: true });
  } catch (err: any) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
