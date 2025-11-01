import { NextResponse } from 'next/server';
import prisma from '../../../db';
import { listFallbackFiles, getFileContent, deleteFile } from '../../../lib/githubFallback';

const SECRET_HEADER = 'x-flush-secret';

export async function POST(req: Request) {
  try {
    const secret = req.headers.get(SECRET_HEADER) || '';
    if (!process.env.GITHUB_FLUSH_SECRET || secret !== process.env.GITHUB_FLUSH_SECRET) {
      return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
    }

    const files = await listFallbackFiles();
    const results: Array<{ path: string; ok: boolean; error?: string }> = [];

    for (const f of files) {
      try {
        const { content, sha } = await getFileContent(f.path);
        const entry = JSON.parse(content);
        await prisma.guestbook.create({ data: { username: entry.username ?? 'Anonymous', message: entry.message ?? '' } });
        await deleteFile(f.path, sha);
        results.push({ path: f.path, ok: true });
      } catch (err: any) {
        results.push({ path: f.path, ok: false, error: String(err) });
      }
    }

    return NextResponse.json({ ok: true, processed: results.length, results });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
