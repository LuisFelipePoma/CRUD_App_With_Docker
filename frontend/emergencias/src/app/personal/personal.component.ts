import { Component, OnInit } from '@angular/core';
import { APISService } from '../services/backend.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css'],
})
export class PersonalComponent implements OnInit {
  //---- Declaracion de variables

  mostrarFormulario = false; // variable para mostrar dinamicamente el forms
  tipoEnvio!: String;

  // Variables para manipular los datos ingresados en el forms
  id_personal!: number;
  nombre_personal!: string;
  apellido_pat!: string;
  apellido_mat!: string;
  Tipo_Personal!: string;

  public personal: any = []; // Variable para guardar la data que es recibida
  busqueda: string = ''; // Almacenara el criterio a filtar en la tabla
  //---- Funciones ejecutadas al cargar la pagina

  constructor(
    private personalService: APISService // Se inicializan los servicios de APIs
  ) {}

  ngOnInit(): void {
    this.cargarPersonal(); // Se recibe la informacion de la base de datos
  }

  //---- Funciones que se usaran en la funcionalidad de la pagina

  // Esta funcion valida que los campos del form esten completas para poder enviar la informacion
  public validarCampos() {
    console.log(this.nombre_personal);
    console.log(this.apellido_pat);
    console.log(this.apellido_mat);
    console.log(this.Tipo_Personal);
    if (
      !this.nombre_personal ||
      !this.apellido_pat ||
      !this.apellido_mat ||
      !this.Tipo_Personal
    ) {
      alert('Por favor, complete todos los campos.');
    } else {
      this.guardarPersonal();
    }
  }

  // Funcion que contiene el envio y muestra de datos del form
  public guardarPersonal() {
    // Envía los datos a la base de datos
    if (this.tipoEnvio == 'editar') this.editarData(this.id_personal);
    else this.enviarData();

    // Se muestra los datos enviados en la consola
    console.log(
      'Datos enviados: ',
      this.nombre_personal,
      this.apellido_pat,
      this.apellido_mat,
      this.Tipo_Personal
    );

    // Oculta el formulario emergente
    this.mostrarFormulario = false;
  }

  // Funcion que al ser llamada limpia los campos del form
  public limpiarPersonal() {
    this.nombre_personal = '';
    this.apellido_pat = '';
    this.apellido_mat = '';
    this.Tipo_Personal = '';
  }

  // Funcion que es llamada al pulsar el boton cancelar del form
  public cancelar() {
    // Oculta el formulario emergente
    this.mostrarFormulario = false;
  }

  public editarPersonal(item: any) {
    this.mostrarFormulario = true;
    this.limpiarPersonal();
    this.tipoEnvio = 'editar';
    let personal = Object.values(item);
    this.id_personal = Number(personal[0]);
    this.nombre_personal = String(personal[1]);
    this.apellido_pat = String(personal[2]);
    this.apellido_mat = String(personal[3]);
  }
  //--------> FUNCIONES DE BUSQUEDA POR FILTROS

  // Funcion que lee el textbox y filtra la informacion
  public filtrarIncidentes() {
    if (this.busqueda === '') {
      this.cargarPersonal(); // Si la busqueda es nula se vuelve a cargar toda la data
    } else {
      this.personal = this.personal.filter((personal: any) => {
        // Mediante variables auxiliares se captura los datos de cada elemento
        const termino = this.busqueda.toLowerCase();
        console.log(personal);
        const id_personal = String(personal.id_personal);
        const nombre = personal.nombre.toLowerCase();
        const apellido_pat = personal['apellido-pat'].toLowerCase();
        const apellido_mat = personal['apellido-mat'].toLowerCase();
        const tipo = personal.tipo.toLowerCase();
        return (
          // Con esos mismo se compara si hay similitudes
          id_personal.includes(termino) ||
          nombre.includes(termino) ||
          apellido_pat.includes(termino) ||
          apellido_mat.includes(termino) ||
          tipo.includes(termino)
        );
      });
    }
  }
  // Funcion que limpia el textbox y recarga la informacion sin filtrar
  public limpiarBusqueda() {
    this.busqueda = ''; // Limpia el buscador
    this.cargarPersonal(); // Vuelve a cargar los datos iniciales
  }

  //---- Funciones que llaman a los servicios

  // Funcion que llama a un servicio para obtener los datos del personal
  public cargarPersonal() {
    // Se llama a la variable del servicio y a la funcion correspondiente
    this.personalService.obtenerPersonal().subscribe({
      next: (response) => {
        this.personal = response; // Se le asigna la respuesta del servidor a la variable para obtener la data
        let personales = []; // Variable temporal para realizar cambios en la data

        // Se recorren los datos y se van cambiando los datos dependiendo del tipo de personal
        for (let item of this.personal) {
          if (item.tipo == 'P') {
            item.tipo = 'Personal Médico';
          } else {
            item.tipo = 'Conductor';
          }
          personales.push(item); // Se agrega el item con el valor cambiado a un arreglo
        }
        this.personal = personales; // Se le asigna el arreglo modificado a la variable que almacena la data en la pagina web
      },
      error: (error: HttpErrorResponse) => {
        // en caso de algun error en recibir la data
        alert(error.message); // Muestra una alerta sobre el error
      },
    });
  }

  // Funcion que envia data del form al servidor para agregar un nuevo personal
  public enviarData() {
    // Se llama a la variable del servicio y a la funcion correspondiente
    this.personalService
      .enviarPersonal({
        // La informacion se envia en formato JSON
        nombre_personal: this.nombre_personal,
        apellido_pat: this.apellido_pat,
        apellido_mat: this.apellido_mat,
        tipo: this.Tipo_Personal,
      })
      .subscribe({
        next: (response) => {
          // El servidor retorna una respuesta del envio
          console.log('Respuesta recibida');

          // Se limpia la respuesta en status y message
          let respuesta = Object.values(response);
          let status = respuesta.at(1);
          let message = respuesta.at(0);

          // Se muestra en consola la respuesta
          console.log(status, ' => ', message);

          if (status == 'error')
            alert(message); // Se muestra una alerta del error del servidor
          else {
            message =
              'Se agrego exitosamente el personal medico : ' +
              this.nombre_personal +
              ' ' +
              this.apellido_pat +
              '.';
            alert(message); // Se muestra una alerta de exito
            this.cargarPersonal(); // Se actualiza la data con los cambios realizados
          }
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message); // Se muestra una alerta del error del servidor
        },
        complete: () => {
          // El método complete() se llama cuando el observable se completa
          console.log('Proceso => Añadir Personal => completo');
        },
      });
  }

  // Funcion que envia data del form al servidor para eliminar un personal
  public eliminarData(id: number) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        id_personal: id,
      },
    };
    // Se llama a la variable del servicio y a la funcion correspondiente
    this.personalService
      .eliminarPersonal(options) //  Se envia el id del personal a eliminar
      .subscribe({
        next: (response) => {
          console.log('Respuesta recibida'); // Se recibe una respuesta del servidor

          // Se limpia la respuesta en status y message
          let respuesta = Object.values(response);
          let status = respuesta.at(1);
          let message = respuesta.at(0);

          // Se muestra en consola la respuesta
          console.log(status, ' => ', message);

          if (status == 'error')
            alert(message); // Se muestra una alerta del error del servidor
          else {
            message =
              'Se elimino exitosamente al personal medico seleccionado.';
            alert(message); // Se muestra una alerta de exito
            this.cargarPersonal(); // Se actualiza la data con los cambios realizados
          }
        },
        error: (error: HttpErrorResponse) => {
          // En caso de algun error en enviar la data salta un error
          alert(error.message); // Se muestra una alerta del mensaje del error
          console.log(error); // se muestra en consola el error
        },
        complete: () => {
          // El método complete() se llama cuando el observable se completa
          console.log('Proceso => Eliminar Personal => completo');
        },
      });
  }
  // Funcion que envia data del form al servidor para editar un personal
  public editarData(id: number) {
    this.personalService
      .editarPersonal({
        id_personal: id,
        nombre_personal: this.nombre_personal,
        apellido_pat: this.apellido_pat,
        apellido_mat: this.apellido_mat,
        tipo: this.Tipo_Personal,
      })
      .subscribe({
        next: (response) => {
          console.log('Personal editado enviado');

          // Se limpia la respuesta en status y message
          let respuesta = Object.values(response);
          let status = respuesta.at(1);
          let message = respuesta.at(0);

          // Se muestra en consola la respuesta
          console.log(status, ' => ', message);
          if (status == 'error')
            alert(message); // Se muestra una alerta del error del servidor
          else {
            message = 'Se edito exitosamente al personal medico seleccionado.';
            alert(message); // Se muestra una alerta de exito
            this.cargarPersonal(); // Se actualiza la data con los cambios realizados
          }
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message); // Se muestra una alerta del error del servidor
        },
        complete: () => {
          // El método complete() se llama cuando el observable se completa
          console.log('Proceso => Editar Personal => completo');
        },
      });
    this.tipoEnvio = '';
  }
}
