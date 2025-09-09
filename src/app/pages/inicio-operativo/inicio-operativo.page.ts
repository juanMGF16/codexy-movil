import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { Router } from '@angular/router';
import { 
  logOutOutline, 
  cloudUploadOutline, 
  personCircleOutline, 
  chatbubbleEllipsesOutline, 
  documentTextOutline, 
  homeOutline, 
  qrCodeOutline, 
  ellipsisHorizontalCircleOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-inicio-operativo',
  templateUrl: './inicio-operativo.page.html',
  styleUrls: ['./inicio-operativo.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class InicioOperativoPage {
  items = [
    { nombre: 'Portátiles', contador: '0/8' },
    { nombre: 'Monitores', contador: '0/7' },
    { nombre: 'Cables HDMI', contador: '0/3' },
    { nombre: 'Mouse Alámbricos', contador: '0/15' },
  ];

  constructor(private router: Router) {
    addIcons({ 
      logOutOutline, cloudUploadOutline, personCircleOutline, 
      chatbubbleEllipsesOutline, documentTextOutline, 
      homeOutline, qrCodeOutline, ellipsisHorizontalCircleOutline 
    });
  }

  goToItem(item: any) {
    if (item.nombre === 'Mouse Alámbricos') {
      this.router.navigate(['/inicio-mouse']);
    }
  
  }
}