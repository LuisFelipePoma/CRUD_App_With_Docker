import { Component } from '@angular/core';
import { Usuario } from './prueba.model';
import { HttpClient } from '@angular/common/http';
import {PruebaService} from './services/backend.service';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'emergencias';
  usuarios!: Object;
  constructor(private usuariosService: PruebaService) { }

  ngOnInit() {
    this.usuariosService.obtenerUsuarios().subscribe((usuarios: Object) => {
      this.usuarios = Object.values(usuarios.valueOf());
      console.log(Object.values(usuarios.valueOf()));
    });
  }
  // data = Object.values(this.usuarios);

}
