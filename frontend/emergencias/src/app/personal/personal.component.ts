import { Component, OnInit } from '@angular/core';
import {PruebaService} from '../services/backend.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {
  public personal: any = [];
  constructor(private usuariosService: PruebaService) { }

  ngOnInit() {
    this.usuariosService.obtenerUsuarios().subscribe(personal => {
      this.personal = personal;
      console.log(personal)
    });
  }
}
