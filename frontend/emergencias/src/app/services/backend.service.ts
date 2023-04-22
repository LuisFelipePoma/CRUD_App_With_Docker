import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class APISService {

  constructor(private http: HttpClient) { }

  // Funciones para llamar las APIs para traer la informacion de las tablas
  obtenerPersonal() {
    return this.http.get('http://127.0.0.1:5000/personal');
  }
  obtenerIncidente(){
    return this.http.get('http://127.0.0.1:5000/incidente');
  }
  obtenerEquipo(){
    return this.http.get('http://127.0.0.1:5000/equipo');
  }

  // Funciones para llamar las APIs para enviar informacion al backend
  enviarPersonal(body:any){
    return this.http.post("http://127.0.0.1:5000/insert_personal",body);
  }
  eliminarPersonal(body: any) {
    return this.http.post("http://127.0.0.1:5000/delete_personal", body);
  }
  editarPersonal(body: any) {
    return this.http.post("http://127.0.0.1:5000/edit_personal", body);
  }
}
