import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { QrScannerService } from '../services/qr-scanner.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-qr-scanner-jsqr',
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './qr-scanner-jsqr.component.html',
  styleUrls: ['./qr-scanner-jsqr.component.scss']
})
export class QrScannerJsqrComponent implements OnInit, OnDestroy {
  @ViewChild('video', { static: false }) video!: ElementRef<HTMLVideoElement>;

  constructor(private qrScanner: QrScannerService) {}

  ngOnInit() {
    this.startCamera();
  }

  ngOnDestroy() {
    this.qrScanner.stopScan();
  }

  async startCamera() {
    try {
      // Solicita acceso a la cámara
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });

      this.video.nativeElement.srcObject = stream;
      this.video.nativeElement.onloadedmetadata = () => {
        this.video.nativeElement.play();
        this.startScan();
      };

    } catch (err) {
      console.error('Error al acceder a la cámara:', err);
      alert('No se pudo acceder a la cámara. ¿Permitiste el permiso?');
    }
  }

  async startScan() {
    try {
      const code = await this.qrScanner.startScan(this.video.nativeElement);
      if (code) {
        console.log('Código QR detectado:', code);
        // Aquí puedes emitir un evento o abrir un modal con el resultado
      }
    } catch (err) {
      console.error('Error al escanear:', err);
    }
  }

  async cancelScan() {
    await this.qrScanner.stopScan();
    // Puedes cerrar este componente o navegar a otra página
    // Ejemplo: this.router.navigate(['/home']);
  }
}