import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { 
  arrowBackOutline, 
  timeOutline, 
  checkmarkCircleOutline
} from 'ionicons/icons';
import { Router, ActivatedRoute } from '@angular/router';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-inicio-mouse',
  templateUrl: './inicio-mouse.page.html',
  styleUrls: ['./inicio-mouse.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class InicioMousePage implements OnInit {
  categoria: any;
  items: any[] = [];
  cargando = true;
  zonaId!: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    addIcons({ arrowBackOutline, timeOutline, checkmarkCircleOutline });
  }

 ngOnInit() {
  this.zonaId = Number(this.route.snapshot.paramMap.get('zonaId'));
  const nav = this.router.getCurrentNavigation();
  if (nav?.extras.state && nav.extras.state['categoria']) {
    this.categoria = nav.extras.state['categoria'];

    this.items = this.categoria.items.map((it: any) => ({
      ...it,
      leido: it.leido || false,
      normCode: this.normalize(it.code)
    }));
  }
  this.cargando = false;
}


  private normalize(str: string): string {
    if (!str) return '';
    return str
      .replace(/^Code:/i, '')
      .replace(/[\s_-]+/g, '')
      .trim()
      .toLowerCase();
  }

  goBack() {
    this.router.navigate(['/inicio-operativo', this.zonaId]);
  }

  async iniciarEscaneo() {
    const result = await BarcodeScanner.scan();
    if (result.barcodes.length > 0) {
      let codigo = result.barcodes[0].rawValue;
      const codigoNorm = this.normalize(codigo);

      const item = this.items.find(it => it.normCode === codigoNorm);
      if (item) {
        item.leido = true;
        item.status = 'Leído';
        this.cdr.detectChanges();
      }
    }
  }
}
