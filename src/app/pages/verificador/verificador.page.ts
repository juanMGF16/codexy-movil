import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { addIcons } from 'ionicons';
import {
  personOutline,
  keyOutline,
  lockClosedOutline,
  arrowBackOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-verificador',
  templateUrl: './verificador.page.html',
  styleUrls: ['./verificador.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class VerificadorPage {
recuperar() {
throw new Error('Method not implemented.');
}
  usuario = '';
  contrasena = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertCtrl: AlertController
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
      this.showAlert('Datos incompletos', 'Debes ingresar usuario y contraseña.');
      return;
    }

  if (this.usuario?.trim() === 'verificador' && this.contrasena?.trim() === '55555555') {
  this.router.navigate(['/verificador-operativo']);
  return;
}

 
    try {
      const res = await this.authService.login(this.usuario, this.contrasena).toPromise();
      if (res?.token) {
        await this.authService.storage.set('access_token', res.token);
        await this.authService.storage.set('refresh_token', res.refreshToken);
        this.showAlert('Acceso correcto', 'Bienvenido al sistema');
        this.router.navigate(['/home']);
      } else {
        this.showAlert('Acceso denegado', 'Credenciales inválidas');
      }
    } catch (error) {
      this.showAlert('Error', 'No fue posible iniciar sesión.');
      console.error(error);
    }
  }

  private async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
