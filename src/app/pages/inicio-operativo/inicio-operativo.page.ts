import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';


import { Router, ActivatedRoute } from '@angular/router';
import { 
  arrowBackOutline, cloudUploadOutline, personCircleOutline, 
  chatbubbleEllipsesOutline, documentTextOutline, 
  homeOutline, qrCodeOutline, ellipsisHorizontalCircleOutline,
  personAddOutline, checkmarkOutline
} from 'ionicons/icons';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-inicio-operativo',
  templateUrl: './inicio-operativo.page.html',
  styleUrls: ['./inicio-operativo.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class InicioOperativoPage {
  categorias: any[] = [];
  cargando = true;

  // 🔹 Modal de Invitación
  isInviteOpen = false;
  code = ['D', '8', 'K', '4'];

  // 🔹 Modal de Observaciones
  isObservacionesOpen = false;
  observacionTexto: string = '';

  // 🔹 Modal de Salida
  isExitOpen: boolean = false;

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private categoryService: CategoryService
  ) {
    addIcons({ 
      cloudUploadOutline, personCircleOutline, 
      chatbubbleEllipsesOutline, documentTextOutline, 
      homeOutline, qrCodeOutline, ellipsisHorizontalCircleOutline,
      personAddOutline, arrowBackOutline, checkmarkOutline
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

  // 🔹 Control Modal Invitación
  openInviteModal() { this.isInviteOpen = true; }
  closeInviteModal() { this.isInviteOpen = false; }

  // 🔹 Control Modal Observaciones
  openObservacionesModal() { this.isObservacionesOpen = true; }
  closeObservacionesModal() { this.isObservacionesOpen = false; }

  guardarObservacion() {
    console.log("Observación guardada:", this.observacionTexto);
    this.closeObservacionesModal();
  }

  // 🔹 Control Modal de Salida
  openExitModal() { this.isExitOpen = true; }
  closeExitModal() { this.isExitOpen = false; }

  confirmarSalir() {
    alert("⚠️ No puedes salir, el inventario no ha finalizado.");
    this.closeExitModal();
  }
}
