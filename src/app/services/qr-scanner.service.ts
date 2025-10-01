// src/app/services/qr-scanner.service.ts
import { Injectable } from '@angular/core';
import { BrowserMultiFormatReader, DecodeHintType } from '@zxing/library';

@Injectable({
  providedIn: 'root'
})
export class QrScannerService {

  private codeReader: BrowserMultiFormatReader | null = null;

  async startScan(videoElement: HTMLVideoElement): Promise<string | null> {
    try {
      // Inicializa el lector
      this.codeReader = new BrowserMultiFormatReader();

      // Configura los formatos que quieres escanear (QR por defecto)
      const hints = new Map<DecodeHintType, any>();
      // hints.set(DecodeHintType.TRY_HARDER, true); // Opcional: mejora la detección

      return new Promise((resolve, reject) => {
        this.codeReader?.decodeFromVideoDevice(null, videoElement, (result, err) => {
          if (result) {
            console.log('QR detectado:', result.getText());
            this.stopScan();
            resolve(result.getText());
          }
          if (err) {
            console.error('Error al escanear:', err);
            reject(err);
          }
        });
      });

    } catch (error) {
      console.error('Error al iniciar el escáner:', error);
      throw error;
    }
  }

  async stopScan() {
    if (this.codeReader) {
      this.codeReader.reset();
      this.codeReader = null;
    }
  }
}