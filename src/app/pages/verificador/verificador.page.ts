// verificador.page.ts
import { Component } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { addIcons } from 'ionicons';
import {
  personOutline,
  keyOutline,
  lockClosedOutline,
  arrowBackOutline,
} from 'ionicons/icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verificador',
  templateUrl: './verificador.page.html',
  styleUrls: ['./verificador.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class VerificadorPage {
  usuario = '';
  contrasena = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastController: ToastController
  ) {
    addIcons({
      personOutline,
      keyOutline,
      lockClosedOutline,
      arrowBackOutline,
    });
  }

  goBack() {
    this.router.navigate(['/login']);
  }

  async acceder() {
    if (!this.usuario || !this.contrasena) {
      this.showToast('Por favor ingresa usuario y contraseña');
      return;
    }

    try {
      const res = await this.authService.login(this.usuario, this.contrasena).toPromise();

      if (res?.token) {
        await this.authService.storage.set('access_token', res.token);
        await this.authService.storage.set('refresh_token', res.refreshToken);

        this.router.navigate(['/home']); // 👈 redirige al home
      } else {
        this.showToast('Credenciales inválidas');
      }
    } catch (error) {
      this.showToast('Error al iniciar sesión');
      console.error(error);
    }
  }

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      color: 'danger'
    });
    await toast.present();
  }
}
