import { NextResponse } from 'next/server';
import prisma from '../../db';
import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { uploadFallbackToGithub } from '../../lib/githubFallback';

const FALLBACK_PATH = path.join(process.cwd(), 'data', 'guestbook-fallback.json');

async function writeFallback(entry: any) {
  await fs.mkdir(path.dirname(FALLBACK_PATH), { recursive: true });
  try {
    const raw = await fs.readFile(FALLBACK_PATH, 'utf8');
    const arr = JSON.parse(raw);
    arr.push(entry);
    await fs.writeFile(FALLBACK_PATH, JSON.stringify(arr, null, 2));
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      await fs.writeFile(FALLBACK_PATH, JSON.stringify([entry], null, 2));
    } else {
      throw err;
    }
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const entry = {
      username: body.username ?? 'Anonymous',
      message: body.message ?? '',
      created_at: new Date(),
    };

    // Try database write
    try {
      await prisma.guestbook.create({ data: { username: entry.username, message: entry.message } });
      // revalidate guestbook page so ISR pages update quickly
      try {
        revalidatePath('/guestbook');
      } catch (e) {
        // ignore revalidation errors
      }
      return NextResponse.json({ ok: true });
    } catch (dbErr) {
      console.log('DB write failed, using fallback. Error:', dbErr);
      // DB failed -> try GitHub fallback if configured, else fallback to file
      try {
        if (process.env.GITHUB_REPO && process.env.GITHUB_TOKEN) {
          console.log('Uploading to GitHub fallback:', process.env.GITHUB_REPO);
          await uploadFallbackToGithub({ username: entry.username, message: entry.message, createdAt: new Date().toISOString() });
          console.log('✅ GitHub fallback succeeded');
          return NextResponse.json({ ok: true, fallback: 'github' }, { status: 201 });
        }

        console.log('No GitHub config, using local file fallback');
        await writeFallback({ username: entry.username, message: entry.message, createdAt: new Date().toISOString() });
        console.log('✅ Local file fallback succeeded');
        return NextResponse.json({ ok: true, fallback: 'file' }, { status: 201 });
      } catch (fsErr) {
        console.error('❌ Fallback write failed:', fsErr);
        return NextResponse.json({ ok: false, error: String(fsErr) }, { status: 500 });
      }
    }
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 400 });
  }
}
