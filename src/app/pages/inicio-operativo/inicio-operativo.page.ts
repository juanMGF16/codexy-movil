import { Component } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { HttpClient } from '@angular/common/http';
import { addIcons } from 'ionicons';
import { ExportadorComponent } from 'src/app/components/exportador/exportador.component';
import { Router, ActivatedRoute } from '@angular/router';

import { 
  arrowBackOutline, cloudUploadOutline, personCircleOutline, 
  chatbubbleEllipsesOutline, documentTextOutline, 
  homeOutline, qrCodeOutline, ellipsisHorizontalCircleOutline,
  personAddOutline, checkmarkOutline, logOutOutline, 
  checkmarkDoneOutline, closeOutline
} from 'ionicons/icons';

import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-inicio-operativo',
  templateUrl: './inicio-operativo.page.html',
  styleUrls: ['./inicio-operativo.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ExportadorComponent]
})
export class InicioOperativoPage {  
  categorias: any[] = [];
  cargando = true;

  isInviteOpen = false;
  code = ['D', '8', 'K', '4'];

  isObservacionesOpen = false;
  observacionTexto: string = '';

  isExitOpen: boolean = false;
  isConfirmOpen: boolean = false;
  isExportOpen: boolean = false;
    isStartInventoryOpen = false; 

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private categoryService: CategoryService,
    private http: HttpClient,
    private toastCtrl: ToastController
  ) {
    addIcons({ 
      cloudUploadOutline, personCircleOutline, 
      chatbubbleEllipsesOutline, documentTextOutline, 
      homeOutline, qrCodeOutline, ellipsisHorizontalCircleOutline,
      personAddOutline, arrowBackOutline, checkmarkOutline, 
      logOutOutline, checkmarkDoneOutline, closeOutline
    });
  }

  ngOnInit() {
    const zonaId = Number(this.route.snapshot.paramMap.get('zonaId'));
    this.categoryService.getItemsByCategory(zonaId).subscribe({
      next: (data) => {
        // 🔹 cada item empieza con leido = false y normalizamos "code"
        this.categorias = data.map(cat => ({
          ...cat,
          items: cat.items.map((i: any) => ({
            ...i,
            leido: false,
            code: i.code || i.Code || '' // tolera mayúsculas/minúsculas
          }))
        }));
        console.log('Categorias recibidas:', this.categorias);
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error cargando categorías:', err);
        this.cargando = false;
      }
    });
  }

  goToItem(categoria: any) {
    this.router.navigate(
      ['/inicio-mouse', categoria.id, this.route.snapshot.paramMap.get('zonaId')],
      { state: { categoria } }
    );
  }

  openInviteModal() { this.isInviteOpen = true; }
  closeInviteModal() { this.isInviteOpen = false; }

  openObservacionesModal() { this.isObservacionesOpen = true; }
  closeObservacionesModal() { this.isObservacionesOpen = false; }

  guardarObservacion() {
    console.log("Observación guardada:", this.observacionTexto);
    this.closeObservacionesModal();
  }

  openExitModal() { this.isExitOpen = true; }
  closeExitModal() { this.isExitOpen = false; }

  openConfirmModal() { this.isConfirmOpen = true; }
  closeConfirmModal() { this.isConfirmOpen = false; }

  confirmarInventario() {
    console.log("Inventario confirmado y notificado al encargado de zona");
    this.closeConfirmModal();
  }

  openExportModal() { this.isExportOpen = true; }
  closeExportModal() { this.isExportOpen = false; }

  // 🔹 escaneo de QR global (nivel operativo)
  // 🔹 QR inicial
async openQR() {
  try {
    // 1. Pedir permisos de cámara
    const perm = await BarcodeScanner.requestPermissions();
    console.log("Permisos de cámara:", perm);

    // 2. Si permisos concedidos, mostrar modal
    if (perm.camera === 'granted') {
      this.isStartInventoryOpen = true;
    } else {
      // Si el usuario no da permiso, mostramos un aviso
      const toast = await this.toastCtrl.create({
        message: 'Se necesita permiso de cámara para iniciar el inventario.',
        duration: 2500,
        color: 'warning'
      });
      toast.present();
    }
  } catch (err) {
    console.error('Error solicitando permisos:', err);
  }
}

closeStartInventoryModal() {
  this.isStartInventoryOpen = false;
}

cancelStartInventory() {
  this.isStartInventoryOpen = false;
  this.router.navigate(['/home']); 
}

async confirmStartInventory() {
  this.isStartInventoryOpen = false;
  try {
    const { barcodes } = await BarcodeScanner.scan();
    if (barcodes.length > 0) {
      const code = barcodes[0].rawValue || '';
      console.log('Primer código leído para iniciar inventario:', code);
    }
  } catch (err: any) {
    if (err?.message?.includes('canceled')) {
      console.log('El usuario canceló el escaneo.');
      return;
    }
    console.error('Error inesperado al escanear:', err);
  }
}


}