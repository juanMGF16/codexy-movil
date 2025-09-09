import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { arrowBackOutline, lockClosedOutline, lockOpenOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class HomePage {
  searchTerm: string = '';

  zonas = [
    { nombre: '309-1', libre: true },   // ✅ primera desbloqueada
    { nombre: '309-2', libre: false },
    { nombre: '309-3', libre: false },
    { nombre: '309-4', libre: false }
  ];

  constructor(private router: Router) {
    addIcons({ arrowBackOutline, lockClosedOutline, lockOpenOutline });
  }

  goBack() {
    this.router.navigate(['/login']);
  }
goToOperativo(zona: any) {
  console.log('Entrando a zona:', zona.nombre);

  // 👉 Redirige a la página de inicio operativo
  this.router.navigate(['/inicio-operativo'], {
    queryParams: { zona: zona.nombre } // opcional, para saber desde qué zona viene
  });
}

  filteredZonas() {
    if (!this.searchTerm) return this.zonas;
    return this.zonas.filter(z =>
      z.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
