import { Component } from '@angular/core';
import { APISService } from '../services/backend.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-incidentes',
  templateUrl: './incidentes.component.html',
  styleUrls: ['./incidentes.component.css'],
})
export class IncidentesComponent {
  public incidentes: any = [];
  busqueda: string = '';
  constructor(private incidenteService: APISService) {}

  ngOnInit() {
    this.cargarIncidentes();
  }

  // FUNCIONES
  // FUNCIONES PARA MANEJAR LAS APIS

  public cargarIncidentes() {
    this.incidenteService.obtenerIncidente().subscribe({
      next: (response) => {
        this.incidentes = response;
        const incidentes = [];
        for (let item of this.incidentes) {
          const dateObject = new Date(item.fecha_incidente);
          let dateFormat = dateObject.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
          item.fecha_incidente = dateFormat;
          const timeObject = new Date(item.hora_incidente);
          item.hora_incidente = timeObject.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          });
          incidentes.push(item);
        }
        console.log(incidentes);
        this.incidentes = incidentes;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
      complete: () => {
        // El método complete() se llama cuando el observable se completa
        console.log('Proceso => Cargar Incidetnes => completo');
      },
    });
  }

  // FUNCIONES DE BUSQUEDA
  public filtrarIncidentes() {
    if (this.busqueda === '') {
      this.cargarIncidentes();
    } else {
      this.incidentes = this.incidentes.filter((incidente: any) => {
        const termino = this.busqueda.toLowerCase();
        const descripcion = incidente.descripcion_incidente.toLowerCase();
        const fecha = incidente.fecha_incidente.toLowerCase();
        const hora = incidente.hora_incidente.toLowerCase();
        const distrito = incidente.distrito_incidente.toLowerCase();
        return (
          descripcion.includes(termino) ||
          fecha.includes(termino) ||
          hora.includes(termino) ||
          distrito.includes(termino)
        );
      });
    }
  }
  public limpiarBusqueda() {
    this.busqueda = '';
    this.cargarIncidentes();
  }
}
