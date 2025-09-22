import { Injectable } from '@angular/core';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';

@Injectable({
  providedIn: 'root'
})
export class QrService {
  async requestPermission() {
    const status = await BarcodeScanner.requestPermissions();
    return status;
  }

  async scan() {
    const { barcodes } = await BarcodeScanner.scan();
    return barcodes;
  }
}
