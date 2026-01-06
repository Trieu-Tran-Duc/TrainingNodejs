import { openDB, DBSchema } from "idb";

interface ScanDB extends DBSchema {
  scans: {
    key: number;
    value: { barcode: string; time: number; synced: 0 | 1 };
    indexes: {  "by-synced": 0 | 1; };
  };
}

const dbPromise = openDB<ScanDB>("barcode-db", 1, {
  upgrade(db) {
    const store = db.createObjectStore("scans", { keyPath: "time" });
    store.createIndex("by-synced", "synced");
  }
});

export async function saveScan(barcode: string) {
  const db = await dbPromise;
  await db.add("scans", {
    barcode,
    time: Date.now(),
    synced: 0
  });
}

export async function getUnsyncedScans() {
  const db = await dbPromise;
  return db.getAllFromIndex("scans", "by-synced", IDBKeyRange.only(0));
}

export async function markSynced(time: number) {
  const db = await dbPromise;
  const record = await db.get("scans", time);
  if (record) {
    record.synced = 1;
    await db.put("scans", record);
  }
}