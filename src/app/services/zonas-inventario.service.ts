import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

export interface ZonaInventario {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class ZonasInventarioService {

  private urlBase = environment.apiURL + 'api/Zone/GetAll'
  constructor(private http: HttpClient) {}

  getZonas(): Observable<ZonaInventario[]> {
    return this.http.get<ZonaInventario[]>(this.urlBase);
  }
}
