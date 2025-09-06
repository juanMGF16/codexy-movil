import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, 
  IonSearchbar, IonSpinner, IonCardHeader, IonCardTitle, 
  IonGrid, IonRow, IonCol , IonCard, 
} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { ZonaInventario, ZonasInventarioService } from 'src/app/services/zonas-inventario.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
 imports: [
  CommonModule,
  FormsModule,
  RouterModule,
  // Ionic standalone components
  IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonTitle,
  IonContent,
  IonSearchbar,
  IonGrid, IonRow, IonCol,
  IonCard, IonCardHeader, IonCardTitle, 
  IonSpinner,
  
]})
export class HomePage implements OnInit {

  zonas: ZonaInventario[] = [];
  cargando = true;
  characters: any[] = [];
  loading: boolean = true;
  constructor(private zonasService: ZonasInventarioService) {}

  ngOnInit() {
    this.cargarZonas();
  }

  cargarZonas() {
    this.zonasService.getZonas().subscribe({
      next: (data) => {
        this.zonas = data;
        this.cargando = false;
        console.log('Zonas cargadas:', this.zonas);
      },
      error: (err) => {
        console.error('Error al cargar zonas', err);
        this.cargando = false;
      }
    });
  }

}
