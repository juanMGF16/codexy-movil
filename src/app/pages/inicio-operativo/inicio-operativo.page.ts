import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { Router, ActivatedRoute } from '@angular/router';
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

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private categoryService: CategoryService
  ) {
    addIcons({ 
      logOutOutline, cloudUploadOutline, personCircleOutline, 
      chatbubbleEllipsesOutline, documentTextOutline, 
      homeOutline, qrCodeOutline, ellipsisHorizontalCircleOutline 
    });
  }

  ngOnInit() {
    const zonaId = Number(this.route.snapshot.paramMap.get('zonaId')); // viene desde HomePage
    this.categoryService.getItemsByCategory(zonaId).subscribe({
      next: (data) => {
        this.categorias = data;
        this.cargando = false;
        // console.log('Categorías cargadas:', this.categorias);
      },
      error: (err) => {
        console.error('Error cargando categorías:', err);
        this.cargando = false;
      }
    });
  }

  goToItem(categoria: any) {
    this.router.navigate(['/inicio-mouse', categoria.id, this.route.snapshot.paramMap.get('zonaId')], { state: { categoria } });
  }
}
