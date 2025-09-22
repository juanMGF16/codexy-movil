import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor';
import { Platform } from '@ionic/angular';
import { StatusBar } from '@capacitor/status-bar';
import { Style } from '@capacitor/status-bar';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }]
})
export class AppComponent {
  constructor(private platform: Platform) {}
  ngOnInit() {
    this.platform.ready().then(() => {
      // Solo ejecuta esto en un dispositivo real o emulador
      if (this.platform.is('capacitor')) {
        // Haz que la barra de estado se superponga sobre la app para un look moderno
        StatusBar.setOverlaysWebView({ overlay: true });

        // Establece el estilo del texto y los iconos
        // Style.Dark  -> texto blanco (para fondos oscuros)
        // Style.Light -> texto oscuro (para fondos claros)
        StatusBar.setStyle({ style: Style.Dark });

        // IMPORTANTE: El color de fondo solo funciona en Android.
        // En iOS, la barra de estado es transparente.
        if (this.platform.is('android')) {
          StatusBar.setBackgroundColor({ color: '#1e1e1e' }); // Un color oscuro de ejemplo
        }
      }
    });
  }
}
