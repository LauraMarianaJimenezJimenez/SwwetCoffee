import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../servicios/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from '../Modelos/usuario.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  public nombre = '';
  public apellido = '';
  public email = '';
  public contrasena = '';
  public contrasena2 = '';
  public celular!: number;

  constructor(private usuarioservice: UsuarioService, private router: Router) {}

  ngOnInit(): void {}

  public registrarse(): void {
    let regexpEmail = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$');
    if (regexpEmail.test(this.email)) {
      if (this.contrasena == this.contrasena2) {

        var usuarioNuevo : Usuario = new Usuario(this.nombre,this.apellido,this.contrasena,this.email,this.celular,[]);
        this.usuarioservice.registrar(usuarioNuevo).subscribe(
          data =>
          {
            alert('Registrado con exito');
            this.router.navigateByUrl('/login');
          },
          error =>
          {
              alert("El usuario " + this.email + " ya existe")
          }
        )
      } else {
        alert('Las contraseñas no coninciden');
      }
    } else {
      alert('El email no cumple con el formato');
    }

  
  }
}
