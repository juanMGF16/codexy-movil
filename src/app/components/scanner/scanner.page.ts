// src/app/pages/scanner/scanner.page.ts
import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController, LoadingController, IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScanResponseDto } from 'src/app/Interfaces/scan-response.model';
import { STATE_ITEMS, StateItem } from 'src/app/Interfaces/state-item.model';
import { InventoryService } from 'src/app/services/inventary.service';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ScannerPage implements OnInit {

  scannedCode: string | null = null;
  selectedStateId: number | null = null;
  scanResult: ScanResponseDto | null = null;
  stateItems: StateItem[] = STATE_ITEMS;
  inventaryId: number | null = null;
  isLoading = false; // Para bloquear UI durante envío

  constructor(
    private router: Router,
    private inventaryService: InventoryService,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.inventaryId = this.inventaryService.getInventaryId();
    if (!this.inventaryId) {
      this.showError('No se ha iniciado un inventario.');
      this.router.navigate(['/inicio-operativo']);
    }
  }

  async startScan() {
    try {
      const isSupported = await BarcodeScanner.isSupported();
      if (!isSupported) {
        this.showError('Escaneo no soportado en este dispositivo.');
        return;
      }

      const permissions = await BarcodeScanner.requestPermissions();
      if (permissions.camera !== 'granted') {
        this.showError('Permiso de cámara denegado.');
        return;
      }

      const { barcodes } = await BarcodeScanner.scan();

      if (barcodes.length > 0) {
        this.scannedCode = barcodes[0].rawValue;
        this.selectedStateId = null;
        this.scanResult = null;
      }

    } catch (err) {
      console.error('Error al escanear:', err);
      this.showError('No se pudo acceder a la cámara.');
    }
  }

  async sendScan() {
  if (!this.scannedCode || !this.selectedStateId || !this.inventaryId) {
    this.showError('Completa todos los campos.');
    return;
  }


  let cleanCode = this.scannedCode;
  if (cleanCode.startsWith('Code:')) {
    cleanCode = cleanCode.substring(5); 
  }

  this.isLoading = true;

  const request = {
    inventaryId: this.inventaryId,
    code: cleanCode,
    stateItemId: this.selectedStateId
  };

  this.inventaryService.scan(request).subscribe({
    next: (response) => {
      this.isLoading = false;
      this.scanResult = response;
      this.showScanFeedback(response);
    },
    error: async (err) => {
      this.isLoading = false;
      console.error('Error en API:', err);
      this.showError('Error al enviar el escaneo.');
    }
  });
}

  showScanFeedback(response: ScanResponseDto) {
    let message = response.message || 'Operación completada.';
    let header = 'Resultado';

    switch (response.status) {
      case 'Correct':
        header = '✅ Correcto';
        break;
      case 'WrongZone':
        header = '⚠️ Zona incorrecta';
        break;
      case 'NotFound':
        header = '❌ No encontrado';
        break;
      case 'Duplicate':
        header = '🔁 Duplicado';
        break;
    }

    this.presentAlert(header, message);
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async showError(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  goBack() {
    this.router.navigate(['/inicio-operativo']);
  }
}