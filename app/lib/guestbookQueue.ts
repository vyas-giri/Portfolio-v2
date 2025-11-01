type Entry = { username: string; message: string; createdAt: string };

const KEY = "guestbookQueue:v1";

export function enqueueGuestbookEntry(entry: Entry) {
  try {
    const raw = localStorage.getItem(KEY);
    const arr: Entry[] = raw ? JSON.parse(raw) : [];
    arr.push(entry);
    localStorage.setItem(KEY, JSON.stringify(arr));
  } catch (err) {
    console.error('Failed to enqueue guestbook entry', err);
  }
}

export function getQueuedEntries(): Entry[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Failed to read guestbook queue', err);
    return [];
  }
}

export function clearQueuedEntries() {
  try {
    localStorage.removeItem(KEY);
  } catch (err) {
    console.error('Failed to clear guestbook queue', err);
  }
}

// Try to flush queued entries to the server API. Returns true if everything flushed.
export async function flushQueue(): Promise<boolean> {
  const queued = getQueuedEntries();
  if (!queued.length) return true;

  const failed: Entry[] = [];
  let anySucceeded = false;

  // try to send all entries; collect failures
  for (const entry of queued) {
    try {
      const res = await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry),
      });
      if (!res.ok) throw new Error('Server rejected entry');
      anySucceeded = true;
    } catch (err) {
      console.warn('Failed to flush queued guestbook entry, will retry later', err);
      failed.push(entry);
    }
  }

  // update queue with only failed entries
  if (failed.length === 0) {
    clearQueuedEntries();
    return true;
  } else {
    localStorage.setItem(KEY, JSON.stringify(failed));
    return false;
  }
}

const guestbookQueue = {
  enqueueGuestbookEntry,
  getQueuedEntries,
  clearQueuedEntries,
  flushQueue,
};

export default guestbookQueue;
