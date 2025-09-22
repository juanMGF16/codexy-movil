import { Component } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { arrowBackOutline, lockClosedOutline, lockOpenOutline } from 'ionicons/icons';
import { ZonaInventario, ZonasInventarioService } from 'src/app/services/zonas-inventario.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class HomePage {
  searchTerm: string = '';
  zonas: ZonaInventario[] = [];
  cargando = true;

  constructor(
    private router: Router,
    private zonasService: ZonasInventarioService,
    private authService: AuthService,
    private alertController: AlertController
  ) {
    addIcons({ arrowBackOutline, lockClosedOutline, lockOpenOutline });
  }

  // 👇 se ejecuta cada vez que la vista entra en pantalla
  async ionViewWillEnter() {
    const user = await this.authService.getUserFromToken();
    if (user?.userId) {
      this.cargarZonas(user.userId);
    }
  }

  goBack() {
    this.router.navigate(['/login']);
  }

  goToOperativo(zonaId: number) {
    this.router.navigate(['/inicio-operativo', zonaId]); 
  }

  filteredZonas() {
    if (!this.searchTerm) return this.zonas;
    return this.zonas.filter(z =>
      z.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  cargarZonas(userId: number) {
    this.zonasService.getZonas(userId).subscribe({
      next: async (data) => {
        this.zonas = data;
        this.cargando = false;

        if (!this.zonas || this.zonas.length === 0) {
          const alert = await this.alertController.create({
            header: 'Aviso',
            message: 'No tienes inventarios asignados en este momento.',
            buttons: ['OK']
          });
          await alert.present();
        }
      },
      error: async (err) => {
        console.error('Error al cargar zonas', err);
        this.cargando = false;

        if (err.status === 404) {
          const alert = await this.alertController.create({
            header: 'Aviso',
            message: 'No tienes inventarios asignados en este momento.',
            buttons: ['OK']
          });
          await alert.present();
        } else {
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'Ocurrió un problema al cargar las zonas.',
            buttons: ['OK']
          });
          await alert.present();
        }
      }
    });
  }
}
