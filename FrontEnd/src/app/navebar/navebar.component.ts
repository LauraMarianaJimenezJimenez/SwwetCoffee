import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../Modelos/usuario.model';
import { UsuarioService } from '../servicios/usuario.service';

@Component({
  selector: 'app-navebar',
  templateUrl: './navebar.component.html',
  styleUrls: ['./navebar.component.css']
})
export class NavebarComponent implements OnInit {

  constructor( private router: Router, private usuarioServicio: UsuarioService) { }

  ngOnInit(): void {
  }

  public logout()
  {
    this.usuarioServicio.usuarioActivo = {} as Usuario;
    localStorage.setItem('user','');
    localStorage.setItem('admin','');
    this.router.navigateByUrl("/login")
  }
}
