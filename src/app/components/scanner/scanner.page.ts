// // src/app/pages/scanner/scanner.page.ts
// import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
// import { Router } from '@angular/router';
// import { AlertController, ModalController, IonicModule } from '@ionic/angular';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { StateSelectionModalComponent } from '../state-selection-modal/state-selection-modal.component';
// import { ScanFacade } from 'src/app/Business/scan-facade';

// @Component({
//   selector: 'app-scanner',
//   templateUrl: './scanner.page.html',
//   styleUrls: ['./scanner.page.scss'],
//   standalone: true,
//   imports: [IonicModule, CommonModule, FormsModule]
// })
// export class ScannerPage {
//   constructor(
//     private scanFacade: ScanFacade,
//     private modalCtrl: ModalController
//   ) {}

//   async ionViewDidEnter() {
//     await this.scanFacade.start();
//     this.scanFacade.onResult(async (result) => {
//       await this.scanFacade.pause();
//       const modal = await this.modalCtrl.create({
//         component: StateSelectionModalComponent,
//         componentProps: { code: result.raw }
//       });
//       modal.onDidDismiss().then(() => this.scanFacade.resume());
//       await modal.present();
//     });
//   }

//   ionViewWillLeave() {
//     this.scanFacade.stop();
//   }
// }
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { AlertController, ModalController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import jsQR from 'jsqr';
import { InventoryService } from 'src/app/services/inventary.service';
import { StateSelectionModalComponent } from '../state-selection-modal/state-selection-modal.component';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ScannerPage implements OnInit, OnDestroy {
  @ViewChild('video', { static: false }) video!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas', { static: false }) canvas!: ElementRef<HTMLCanvasElement>;

  private stream: MediaStream | null = null;
  private scanning = false;

  constructor(
    private alertController: AlertController,
    private modalController: ModalController,
    private inventoryService: InventoryService
  ) {}

  async ngOnInit() {
    await this.startScanner();
  }

  ngOnDestroy() {
    this.stopScanner();
  }

  private async startScanner() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      this.video.nativeElement.srcObject = this.stream;
      this.video.nativeElement.setAttribute('playsinline', 'true');
      await this.video.nativeElement.play();
      this.scanning = true;
      requestAnimationFrame(() => this.scanLoop());
    } catch (err) {
      console.error('Error de cámara:', err);
      this.showError('No se pudo acceder a la cámara.');
    }
  }

  private scanLoop() {
    if (!this.scanning) return;

    const video = this.video.nativeElement;
    const canvas = this.canvas.nativeElement;
    const ctx = canvas.getContext('2d');

    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx!.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = ctx!.getImageData(0, 0, canvas.width, canvas.height);
      const qr = jsQR(imageData.data, imageData.width, imageData.height);

      if (qr) {
        this.handleScanResult(qr.data);
        return; // detener el loop hasta que cierre modal
      }
    }

    requestAnimationFrame(() => this.scanLoop());
  }

  // private async handleScanResult(rawCode: string) {
  //   this.scanning = false;
  //   const cleanCode = rawCode.replace(/^Code:/, '').trim();

  //   const modal = await this.modalController.create({
  //     component: StateSelectionModalComponent,
  //     componentProps: {
  //       code: cleanCode,
  //       inventaryId: this.inventoryService.getInventaryId()!
  //     }
  //   });

  //   modal.onDidDismiss().then(() => {
  //     // 🔄 reanudar escaneo tras cerrar modal
  //     this.scanning = true;
  //     requestAnimationFrame(() => this.scanLoop());
  //   });

  //   await modal.present();
  // }
private async handleScanResult(rawCode: string) {
  this.scanning = false;
  const cleanCode = rawCode.replace(/^Code:/, '').trim();

  const modal = await this.modalController.create({
    component: StateSelectionModalComponent,
    componentProps: {
      code: cleanCode // 🔹 aquí pasa al modal el valor de prueba
    }
  });

  modal.onDidDismiss().then(() => {
    // 🔄 reanudar escaneo tras cerrar modal
    this.scanning = true;
    requestAnimationFrame(() => this.scanLoop());
  });

  await modal.present();
}

  private stopScanner() {
    this.scanning = false;
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
  }

  private async showError(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
