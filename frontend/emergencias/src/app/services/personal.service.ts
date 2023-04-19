import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  constructor(private http: HttpClient) { }

  guardarPersonal(datos: any) {
    return this.http.post('http://localhost:5000//insert_personal', datos);
  }
}