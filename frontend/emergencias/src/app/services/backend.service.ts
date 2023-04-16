import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PruebaService {

  constructor(private http: HttpClient) { }

  obtenerUsuarios() {
    return this.http.get('http://174.129.174.8:5000/api/prueba');
  }
}
