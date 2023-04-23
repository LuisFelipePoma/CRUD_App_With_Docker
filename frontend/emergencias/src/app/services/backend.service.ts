import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class APISService {
  constructor(private http: HttpClient) {}

  // Funciones para llamar las APIs para enviar informacion al backend

  // APIS para Personal

  // API para traer la informacion de las tabla
  obtenerPersonal() {
    return this.http.get('http://44.201.194.132:5000/personal');
  }

  // API para enviar la informacion de un nuevo personal
  enviarPersonal(body: any) {
    return this.http.post('http://44.201.194.132:5000/insert_personal', body);
  }

  // API para eliminar la informacion de un personal
  eliminarPersonal(body: any) {
    return this.http.post('http://44.201.194.132:5000/delete_personal', body);
  }

  // API para editar la informacion de un personal
  editarPersonal(body: any) {
    return this.http.post('http://44.201.194.132:5000/edit_personal', body);
  }

  //---------------------------

  // APIS para Equipo

  // API para traer la informacion de las tabla
  obtenerEquipo() {
    return this.http.get('http://44.201.194.132:5000/equipo');
  }

  // API para enviar la informacion de un nuevo equipo
  enviarEquipo(body: any) {
    return this.http.post('http://44.201.194.132:5000/insert_equipo', body);
  }

  // API para eliminar la informacion de un equipo
  eliminarEquipo(body: any) {
    return this.http.post('http://44.201.194.132:5000/delete_equipo', body);
  }
  // API para editar la informacion de un equipo
  editarEquipo(body: any) {
    return this.http.post('http://44.201.194.132:5000/edit_equipo', body);
  }

  //---------------------------

  // APIS para Incidentes

  // API para traer la informacion de las tabla
  obtenerIncidente() {
    return this.http.get('http://44.201.194.132:5000/incidente');
  }

  // API para enviar la informacion de un nuevo incidente
  enviarIncidente(body: any) {
    return this.http.post('http://44.201.194.132:5000/insert_incidente', body);
  }
  // API para eliminar la informacion de un incidente
  eliminarIncidente(body: any) {
    return this.http.post('http://44.201.194.132:5000/delete_incidente', body);
  }
  // API para editar la informacion de un incidente
  editarIncidente(body: any) {
    return this.http.post('http://44.201.194.132:5000/edit_incidente', body);
  }
}
