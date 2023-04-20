import { Component, OnInit,ViewChild} from '@angular/core';
import {APISService} from '../services/backend.service';
import { RestService } from '../services/rest.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {
  @ViewChild('miFormulario')
  mostrarFormulario = false;
  nombre_personal: string = '';
  apellido_pat: string = '';
  apellido_mat: string = '';
  Tipo_Personal: string = '';
  public personal: any = [];
  public personal_formateado: any = [];
  public form !: FormGroup;

  constructor(private personalService: APISService, private RestService:RestService,  private formBuilder: FormBuilder) { }

  ngOnInit():void {
    this.cargarPersonal();
    this.form = this.formBuilder.group({
      nombre: [''],
      apellido_pat: [''],
      apellido_mat: [''],
      tipo: ['']
    });
  }
  public validarCampos() {
    if (!this.nombre_personal || !this.apellido_pat || !this.apellido_mat || !this.Tipo_Personal) {
      alert("Por favor, complete todos los campos.");
    }
    else {
      this.enviarData();
      this.guardarPersonal();
    }
  }
  public guardarPersonal() {
    // Envía los datos a la base de datos
    console.log('Datos enviados: ', this.nombre_personal, this.apellido_pat, this.apellido_mat, this.Tipo_Personal);

    // Oculta el formulario emergente
    this.mostrarFormulario = false;
  }
  public limpiarPersonal(){
    this.nombre_personal = '';
    this.apellido_pat = '';
    this.apellido_mat = '';
    this.Tipo_Personal = '';
  }
  public cancelar() {
    // Oculta el formulario emergente
    this.mostrarFormulario = false;
  }
  public cargarPersonal(){
    this.personalService.obtenerPersonal()
      .subscribe(response => {
        this.personal= response;
        let personales = [];
        let tipo;
        for(let item of this.personal){
          if (item.tipo == 'P'){
            tipo = "Personal Médico";
          }
          else{
            tipo = "Conductor";
          }
          item.tipo = tipo;
          personales.push(item);
        }
        this.personal_formateado = personales;
      } )
  }
  public enviarData(){
    this.personalService.enviarPersonal({
      nombre_personal: this.form.value.nombre,
      apellido_pat: this.form.value.apellido_pat,
      apellido_mat: this.form.value.apellido_mat,
      tipo: this.form.value.tipo,
    }
   ).subscribe(respuesta => {
     console.log('Respuesta recibida');
     console.log(respuesta);
     this.cargarPersonal();
   })
  }
  public eliminarData(id: number) {
    try {
      this.personalService.eliminarPersonal({
        id_personal: id,
      })
        .subscribe(response => {
          console.log('Respuesta recibida');
          let respuesta = Object.values(response);
          let status = respuesta.at(1);
          let message = respuesta.at(0);
          console.log(status)
          if (status == "error") alert(message);
          this.cargarPersonal();
        });
      this.cargarPersonal();
    } catch (error) {
      alert("Error enviar solicitud.");
    }
  }

  public editarData(id: number) {
    this.personalService.editarPersonal({
      id_personal: id,
    })
      .subscribe(respuesta => {
        console.log('Comentario editado!!!');
        console.log(respuesta);
        this.cargarPersonal();
      })
    this.cargarPersonal();
  }
}


