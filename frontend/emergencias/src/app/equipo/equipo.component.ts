import { Component, OnInit } from '@angular/core';
import { APISService } from '../services/backend.service';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css'],
})
export class EquipoComponent implements OnInit {
  public equipo: any = [];
  constructor(private equipoService: APISService) {}

  ngOnInit() {
    this.equipoService.obtenerEquipo().subscribe((response) => {
      this.equipo= response;
      // let equipos = [];
      // for(let item of this.equipo){
      //   equipos.push(item);
      // }
      // console.log(equipos)
      // this.equipo = equipos;
      console.log(this.equipo);
    });
  }
}
