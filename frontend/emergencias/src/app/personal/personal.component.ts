import { Component, OnInit } from '@angular/core';
import {APISService} from '../services/backend.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {
  mostrarFormulario = false;
  nombre_personal: string = '';
  apellido_pat: string = '';
  apellido_mat: string = '';
  Tipo_Personal: string = '';

  public personal: any = [];
  public personal_formateado: any = [];
  constructor(private personalService: APISService) { }

  ngOnInit() {
    this.personalService.obtenerPersonal().subscribe(response => {
      this.personal= response;
      let personales = [];
      let tipo;
      for(let item of this.personal){
        console.log(item.tipo)
        if (item.tipo == 'P'){
          tipo = "Personal Médico";
        }
        else{
          tipo = "Conductor";
        }
        item.tipo = tipo;
        personales.push(item);
      }
      console.log(personales)
      this.personal_formateado = personales;
    });
  }
  guardarPersonal() {
    // Envía los datos a la base de datos
    console.log('Datos enviados: ', this.nombre_personal, this.apellido_pat, this.apellido_mat, this.Tipo_Personal);

    // Oculta el formulario emergente
    this.mostrarFormulario = false;

    this.nombre_personal = '';
    this.apellido_pat = '';
    this.apellido_mat = '';
    this.Tipo_Personal = '';
  }
  cancelar() {
    // Oculta el formulario emergente
    this.mostrarFormulario = false;
  }
}
