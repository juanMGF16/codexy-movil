import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { arrowBackOutline, timeOutline } from 'ionicons/icons';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inicio-mouse',
  templateUrl: './inicio-mouse.page.html',
  styleUrls: ['./inicio-mouse.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class InicioMousePage implements OnInit {

  categoria: any;
  items: any[] = [];
  cargando = true;

  constructor(private router: Router, private route: ActivatedRoute) {
    addIcons({ arrowBackOutline, timeOutline });
  }

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras.state && nav.extras.state['categoria']) {
      this.categoria = nav.extras.state['categoria'];
      this.items = this.categoria.items;
      // console.log(this.items);
    }
    this.cargando = false;
  }

  goBack() {
    this.router.navigate(['/inicio-operativo', this.categoria.zonaId]);
  }
}
