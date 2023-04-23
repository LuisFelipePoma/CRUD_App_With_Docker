import { Component, OnInit } from '@angular/core';
import { APISService } from '../services/backend.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css'],
})
export class EquipoComponent implements OnInit {
  //---- Declaracion de variables

  mostrarFormulario: boolean = false; // variable para mostrar dinamicamente el forms
  tipoEnvio!: String;

  // Variables para manipular los datos ingresados en el forms
  id_equipo!: number;
  id_conductor!: number;
  id_paramedico1!: number;
  id_paramedico2!: number;
  placa_vehiculo!: string;

  public equipo: any = []; // Almacenara la informacion de la tabla equipo
  busqueda: string = ''; // Almacenara el criterio a filtar en la tabla

  constructor(private equipoService: APISService) {}

  ngOnInit() {
    this.cargarEquipo();
  }

  // FUNCIONES
  //--------> Funciones que se usaran en la funcionalidad de la pagina

  // Esta funcion valida que los campos del form esten completas para poder enviar la informacion
  public validarCampos() {
    // Console.logs para poder ver si se captura la data
    console.log(this.id_conductor);
    console.log(this.id_paramedico1);
    console.log(this.id_paramedico2);
    console.log(this.placa_vehiculo);
    if (
      !this.id_conductor ||
      !this.id_paramedico1 ||
      !this.id_paramedico2 ||
      !this.placa_vehiculo ||
      this.id_conductor == 0 ||
      this.id_paramedico1 == 0 ||
      this.id_paramedico2 == 0
    ) {
      alert('Por favor, complete todos los campos.');
    } else {
      this.guardarEquipo();
    }
  }

  // Funcion que contiene el envio y muestra de datos del form
  public guardarEquipo() {
    // Envía los datos a la base de datos
    if (this.tipoEnvio == 'editar') this.editarData(this.id_equipo);
    else this.enviarData();

    // Se muestra los datos enviados en la consola
    console.log(
      'Datos enviados: ',
      this.id_equipo,
      this.id_conductor,
      this.id_paramedico1,
      this.id_paramedico2,
      this.placa_vehiculo
    );

    // Oculta el formulario emergente
    this.mostrarFormulario = false;
  }
  public editarEquipo(item: any) {
    this.mostrarFormulario = true;
    this.limpiarEquipo();
    this.tipoEnvio = 'editar';
    let personal = Object.values(item);
    console.log(personal);
    this.id_equipo = Number(personal[0]);
    this.id_conductor = Number(personal[1]);
    this.id_paramedico1 = Number(personal[2]);
    this.id_paramedico2 = Number(personal[3]);
    this.placa_vehiculo = String(personal[4]);
  }

  // Funcion que al ser llamada limpia los campos del form
  public limpiarEquipo() {
    this.id_equipo = 0;
    this.id_conductor = 0;
    this.id_paramedico1 = 0;
    this.id_paramedico2 = 0;
    this.placa_vehiculo = '';
  }

  // Funcion que es llamada al pulsar el boton cancelar del form
  public cancelar() {
    // Oculta el formulario emergente
    this.mostrarFormulario = false;
  }

  //--------> FUNCIONES DE BUSQUEDA POR FILTROS

  // Funcion que lee el textbox y filtra la informacion
  public filtrarEquipo() {
    if (this.busqueda === '') {
      this.cargarEquipo(); // Si la busqueda es nula se vuelve a cargar toda la data
    } else {
      this.equipo = this.equipo.filter((equipo: any) => {
        // Mediante variables auxiliares se captura los datos de cada elemento
        const termino = this.busqueda.toLowerCase();
        console.log(equipo.id_conductor);
        let id_equipo = String(equipo.id_equipo);
        let id_conductor = String(equipo.id_conductor);
        let id_paramedico1 = String(equipo.id_paramedico1);
        let id_paramedico2 = String(equipo.id_paramedico2);
        let placa_vehiculo = equipo.placa_vehiculo.toLowerCase();
        return (
          // Con esos mismo se compara si hay similitudes
          id_equipo.includes(termino) ||
          id_conductor.includes(termino) ||
          id_paramedico1.includes(termino) ||
          id_paramedico2.includes(termino) ||
          placa_vehiculo.includes(termino)
        );
      });
    }
  }
  // Funcion que limpia el textbox y recarga la informacion sin filtrar
  public limpiarBusqueda() {
    this.busqueda = ''; // Limpia el buscador
    this.cargarEquipo(); // Vuelve a cargar los datos iniciales
  }

  // -----> FUNCIONES PARA MANEJAR LAS APIs

  // Funcion para traer la informacion del servidor
  public cargarEquipo() {
    this.equipoService.obtenerEquipo().subscribe({
      next: (response) => {
        this.equipo = response;
        console.log(this.equipo);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message); // Se muestra una alerta del error del servidor
      },
      complete: () => {
        // El método complete() se llama cuando el observable se completa
        console.log('Proceso => Cargar Incidentes => completo');
      },
    });
  }
  // Funcion que envia data del form al servidor para eliminar un equipo
  public eliminarData(id: number) {
    // Se llama a la variable del servicio y a la funcion correspondiente
    this.equipoService
      .eliminarEquipo({
        id_equipo: id, //  Se envia el id del personal a eliminar
      })
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
            message = 'Se elimino exitosamente al equipo seleccionado.';
            alert(message); // Se muestra una alerta de exito
            this.cargarEquipo(); // Se actualiza la data con los cambios realizados
          }
        },
        error: (error: HttpErrorResponse) => {
          // En caso de algun error en enviar la data salta un error
          alert(error.message); // Se muestra una alerta del mensaje del error
          console.log(error); // se muestra en consola el error
        },
        complete: () => {
          // El método complete() se llama cuando el observable se completa
          console.log('Proceso => Eliminar Equipo => completo');
        },
      });
  }
  // Funcion que envia data del form al servidor para agregar un nuevo equipo
  public enviarData() {
    // Se llama a la variable del servicio y a la funcion correspondiente
    this.equipoService
      .enviarEquipo({
        // La informacion se envia en formato JSON
        id_conductor: this.id_conductor,
        id_paramedico1: this.id_paramedico1,
        id_paramedico2: this.id_paramedico2,
        placa_vehiculo: this.placa_vehiculo,
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
              'Se agrego exitosamente el equipo : (' +
              this.id_conductor +
              ', ' +
              this.id_paramedico1 +
              ', ' +
              this.id_paramedico2 +
              ') -> ';
            this.placa_vehiculo + '.';
            alert(message); // Se muestra una alerta de exito
            this.cargarEquipo(); // Se actualiza la data con los cambios realizados
          }
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message); // Se muestra una alerta del error del servidor
        },
        complete: () => {
          // El método complete() se llama cuando el observable se completa
          console.log('Proceso => Añadir Equipo => completo');
        },
      });
  }
  // Funcion que envia data del form al servidor para editar un equipo
  public editarData(id: number) {
    this.equipoService
      .editarEquipo({
        id_equipo: id,
        id_conductor: this.id_equipo,
        id_paramedico1: this.id_paramedico1,
        id_paramedico2: this.id_paramedico2,
        placa_vehiculo: this.placa_vehiculo,
      })
      .subscribe({
        next: (response) => {
          console.log('Equipo editado enviado');

          // Se limpia la respuesta en status y message
          let respuesta = Object.values(response);
          let status = respuesta.at(1);
          let message = respuesta.at(0);

          // Se muestra en consola la respuesta
          console.log(status, ' => ', message);
          if (status == 'error')
            alert(message); // Se muestra una alerta del error del servidor
          else {
            message = 'Se edito exitosamente al equipo seleccionado.';
            alert(message); // Se muestra una alerta de exito
            this.cargarEquipo(); // Se actualiza la data con los cambios realizados
          }
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message); // Se muestra una alerta del error del servidor
        },
        complete: () => {
          // El método complete() se llama cuando el observable se completa
          console.log('Proceso => Editar Incidente => completo');
        },
      });
    this.tipoEnvio = '';
  }
}
