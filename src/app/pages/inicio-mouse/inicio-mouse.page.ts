import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { arrowBackOutline, timeOutline } from 'ionicons/icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-mouse',
  templateUrl: './inicio-mouse.page.html',
  styleUrls: ['./inicio-mouse.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class InicioMousePage {
  dispositivos = [
    { id: '00001', serial: '0000A', estado: 'Activo' },
    { id: '00002', serial: '0000B', estado: 'Activo' },
    { id: '00003', serial: '0000C', estado: 'Activo' },
    { id: '00004', serial: '0000D', estado: 'Activo' },
  ];

  constructor(private router: Router) {
    addIcons({ arrowBackOutline, timeOutline });
  }

  goBack() {
    this.router.navigate(['/inicio-operativo']);
  }
}
