import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PruebaService {

  constructor(private http: HttpClient) { }

  obtenerUsuarios() {
    return this.http.get('http://54.161.75.151:5000/api/prueba');
  }
}
