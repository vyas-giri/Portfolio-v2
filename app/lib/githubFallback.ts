// import fetch from 'node-fetch';

const TOKEN = process.env.GITHUB_TOKEN;
const REPO = process.env.GITHUB_REPO; // format: owner/repo

function apiPath(path: string) {
  return `https://api.github.com/repos/${REPO}/contents/${encodeURIComponent(path)}`;
}

function authHeaders() {
  if (!TOKEN) throw new Error('GITHUB_TOKEN not configured');
  return { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json', Accept: 'application/vnd.github+json' };
}

export async function uploadFallbackToGithub(entry: any) {
  if (!REPO) throw new Error('GITHUB_REPO not configured');
  const key = `fallback/guestbook/${Date.now()}-${Math.random().toString(36).slice(2,9)}.json`;
  const url = apiPath(key);
  const body = Buffer.from(JSON.stringify(entry)).toString('base64');

  const res = await fetch(url, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify({ message: 'Add guestbook fallback entry', content: body }),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`GitHub upload failed: ${res.status} ${txt}`);
  }

  const json = await res.json();
  return json.content.path;
}

export async function listFallbackFiles(prefix = 'fallback/guestbook') {
  if (!REPO) throw new Error('GITHUB_REPO not configured');
  const url = `https://api.github.com/repos/${REPO}/contents/${encodeURIComponent(prefix)}`;
  const res = await fetch(url, { headers: authHeaders() });
  if (res.status === 404) return [];
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`GitHub list failed: ${res.status} ${txt}`);
  }
  const json = await res.json();
  // json is array of { path, sha, type }
  return (json || []).filter((item: any) => item.type === 'file').map((item: any) => ({ path: item.path, sha: item.sha }));
}

export async function getFileContent(path: string) {
  if (!REPO) throw new Error('GITHUB_REPO not configured');
  const url = apiPath(path);
  const res = await fetch(url, { headers: authHeaders() });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`GitHub get file failed: ${res.status} ${txt}`);
  }
  const json = await res.json();
  const content = Buffer.from(json.content, 'base64').toString('utf8');
  return { content, sha: json.sha };
}

export async function deleteFile(path: string, sha: string) {
  if (!REPO) throw new Error('GITHUB_REPO not configured');
  const url = apiPath(path);
  const res = await fetch(url, {
    method: 'DELETE',
    headers: authHeaders(),
    body: JSON.stringify({ message: 'Delete processed guestbook fallback', sha }),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`GitHub delete failed: ${res.status} ${txt}`);
  }
  return true;
}

const githubFallback = { uploadFallbackToGithub, listFallbackFiles, getFileContent, deleteFile };
export default githubFallback;
