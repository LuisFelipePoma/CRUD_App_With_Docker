import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class APISService {

  constructor(private http: HttpClient) { }

  obtenerPersonal() {
    return this.http.get('http://127.0.0.1:5000/personal');
  }
  obtenerIncidente(){
    return this.http.get('http://127.0.0.1:5000/incidente');
  }
  obtenerEquipo(){
    return this.http.get('http://127.0.0.1:5000/equipo');
  }

  enviarPersonal(body:any){
    return this.http.post("http://192.168.18.4:5000/insert_personal",body);
  }
}
