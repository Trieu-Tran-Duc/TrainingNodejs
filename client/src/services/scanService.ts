import { saveScan, getUnsyncedScans, markSynced } from "../helper/scan-db";
import api from './axios'
export async function handleScan(barcode: string) {
  if (!navigator.onLine) {
    await saveScan(barcode);
    return;
  }

  try {
    await sendToServer(barcode);
  } catch {
    await saveScan(barcode);
  }
}

export async function syncPendingScans() {
  if (!navigator.onLine) return;

  const scans = await getUnsyncedScans();

  for (const scan of scans) {
    try {
      await sendToServer(scan.barcode);
      await markSynced(scan.time);
    } catch {
      break; // stop retry
    }
  }
}

async function sendToServer(barcode: string) {
    console.log(barcode)
  const res = await api.post("/scans", {
  id: Date.now(),       
  qrData: barcode
})
 
console.log(res)
  if (!res) throw new Error("API error");
}
