import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { addIcons } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons';

@Component({
  selector: 'app-revision-inventario',
  templateUrl: './revision-inventario.page.html',
  styleUrls: ['./revision-inventario.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RevisionInventarioPage {
  categorias: any[] = [];
  cargando = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {
    addIcons({ arrowBackOutline });
  }
goToItems(categoria: any) {
  const zonaId = Number(this.route.snapshot.paramMap.get('id'));
  this.router.navigate(['/items', zonaId], { state: { categoria } });
}

 ngOnInit() {
  const zonaId = Number(this.route.snapshot.paramMap.get('id')); 
  this.categoryService.getItemsByCategory(zonaId).subscribe({
    next: (data) => {
      this.categorias = data.map(cat => ({
        ...cat,
        completa: !!cat.completa
      }));
      this.cargando = false;
    },
    error: (err) => {
      console.error('Error cargando categorías:', err);
      this.cargando = false;
    }
  });


  }

  goBack() {
    this.router.navigate(['/verificador-operativo']);  
  }

  toggleCompleta(categoria: any, value: boolean) {
    categoria.completa = value;
 
  }
}
