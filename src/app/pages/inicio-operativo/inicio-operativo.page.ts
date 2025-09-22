import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
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
  personAddOutline, checkmarkOutline, logOutOutline, checkmarkDoneOutline, closeOutline
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

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private categoryService: CategoryService,
    private http: HttpClient
  ) {
    addIcons({ 
      cloudUploadOutline, personCircleOutline, 
      chatbubbleEllipsesOutline, documentTextOutline, 
      homeOutline, qrCodeOutline, ellipsisHorizontalCircleOutline,
      personAddOutline, arrowBackOutline, checkmarkOutline, logOutOutline, checkmarkDoneOutline, closeOutline
    });
  }

  ngOnInit() {
    const zonaId = Number(this.route.snapshot.paramMap.get('zonaId'));
    this.categoryService.getItemsByCategory(zonaId).subscribe({
      next: (data) => {
        this.categorias = data;
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
  isExportOpen: boolean = false;

openExportModal() {
  this.isExportOpen = true;
}

closeExportModal() {
  this.isExportOpen = false;
}
async openQR() {
  try {
    await BarcodeScanner.requestPermissions();
    const { barcodes } = await BarcodeScanner.scan();

    if (barcodes.length > 0) {
      const code = barcodes[0].rawValue;
      console.log('Código leído:', code);

      // 3. (Opcional) Enviar a tu API eso lo hace juan manuel
      this.http.post('https://tu-api.com/qr', { code }).subscribe({
        next: (res) => console.log('✅ Enviado OK:', res),
        error: (err) => console.error('❌ Error al enviar:', err)
      });
    }
  } catch (err) {
    console.error('Error al escanear:', err);
  }
}

}
