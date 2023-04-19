import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PruebaService {

  constructor(private http: HttpClient) { }

  obtenerUsuarios() {
    return this.http.get('http://192.168.18.4:5000/personal');
  }
}
