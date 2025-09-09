import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
  {
    path: 'welcome',
    loadComponent: () => import('./pages/welcome/welcome.page').then( m => m.WelcomePage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
{
  path: 'verificador',
  loadComponent: () =>
    import('./pages/verificador/verificador.page').then(m => m.VerificadorPage)
},
  {
    path: 'operativo',
    loadComponent: () =>
      import('./pages/operativo/operativo.page').then(m => m.OperativoPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'inicio-operativo',
    loadComponent: () => import('./pages/inicio-operativo/inicio-operativo.page').then( m => m.InicioOperativoPage)
  },
  {
    path: 'inicio-mouse',
    loadComponent: () => import('./pages/inicio-mouse/inicio-mouse.page').then( m => m.InicioMousePage)
  },
  




];
