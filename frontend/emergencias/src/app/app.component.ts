import { Component } from '@angular/core';
import {PruebaService} from './services/backend.service';


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
      this.usuarios = Object.values(usuarios);
    });
  }
}
