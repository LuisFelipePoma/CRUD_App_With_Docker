import { Component } from '@angular/core';
import { APISService } from '../services/backend.service';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css']
})
export class EquipoComponent {
  public equipo: any = [];
  public equipo_formateado: any = [];
  constructor(private equipoService: APISService) { }

  ngOnInit() {
    this.equipoService.obtenerEquipo().subscribe(response => {
      // this.equipo_formateado= response;
      // let equipos = [];
      // for(let item of this.equipo_formateado){
      //   equipos.push(item);
      // }
      // console.log(equipos)
      this.equipo = response;
      console.log(this.equipo)
    });
  }
}
