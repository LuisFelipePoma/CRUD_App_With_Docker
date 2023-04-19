import { Component } from '@angular/core';
import { APISService } from '../services/backend.service';

@Component({
  selector: 'app-incidentes',
  templateUrl: './incidentes.component.html',
  styleUrls: ['./incidentes.component.css'],
})
export class IncidentesComponent {
  public incidentes: any = [];
  public incidentes_formateado: any = [];
  constructor(private incidenteService: APISService) {}

  ngOnInit() {
    this.incidenteService.obtenerIncidente().subscribe(response => {
      this.incidentes = response;
      const incidentes = [];
      this.incidentes_formateado = response
      for (let item of this.incidentes_formateado) {
        const dateObject = new Date(item.fecha_incidente);
        let dateFormat = dateObject.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
        item.fecha_incidente = dateFormat;
        const timeObject = new Date(item.hora_incidente);
        item.hora_incidente = timeObject.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: true,});
        incidentes.push(item);
      }
      console.log(incidentes);
      this.incidentes_formateado = incidentes;
    });
  }
}
