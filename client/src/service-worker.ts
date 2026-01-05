import { openDB, DBSchema } from "idb";

declare const self: ServiceWorkerGlobalScope;

interface SyncEvent extends ExtendableEvent {
  tag: string;
  lastChance: boolean;
}

interface ScanDB extends DBSchema {
  scans: {
    key: number;
    value: { barcode: string; time: number; synced: boolean };
    indexes: { "by-synced": "synced" };
  };
}

const dbPromise = openDB<ScanDB>("barcode-db", 1, {
  upgrade(db) {
    const store = db.createObjectStore("scans", { keyPath: "time" });
    store.createIndex("by-synced", "synced");
  }
});

export default async function saveScan(barcode: string) {
  const db = await dbPromise;
  await db.put("scans", { barcode, time: Date.now(), synced: false });
}

async function getUnsyncedScans() {
  const db = await dbPromise;
  return db.getAllFromIndex("scans", "by-synced", IDBKeyRange.only(false));
}

async function markScansSynced(scans: { time: number }[]) {
  const db = await dbPromise;
  for (const s of scans) {
    const record = await db.get("scans", s.time);
    if (record) {
      record.synced = true;
      await db.put("scans", record);
    }
  }
}

async function syncScans() {
  const unsynced = await getUnsyncedScans();
  if (!unsynced.length) return;
  try {
    const res = await fetch("http://localhost:3000/api/scans", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(unsynced)
    });
    if (res.ok) {
      await markScansSynced(unsynced);
      console.log("Scans synced");
    }
  } catch (err) {
    console.error("Sync failed:", err);
  }
}

self.addEventListener("install", () => {
  console.log("SW installed");
  self.skipWaiting();
});

self.addEventListener("activate", () => {
  console.log("SW activated");
  self.clients.claim();
});

self.addEventListener("sync", (event) => {
  const syncEvent = event as SyncEvent;
  if (syncEvent.tag === "sync-scans") {
    syncEvent.waitUntil(syncScans());
  }
});