import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/Modelos/usuario.model';
import { VentaService } from './venta.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public usuario1: Usuario = new Usuario(
    'Chucho',
    'Perez',
    '12345',
    'chuchoperez@gmail.com',
    300,
    [],
    false
  );
  public admin: Usuario = new Usuario(
    'Maria',
    'Martinez',
    'Admin',
    'admin@gmail.com',
    301,
    [],
    true
  );


  public usuarios: Usuario[] = [this.usuario1, this.admin];

  public usuarioActivo: Usuario = {} as Usuario
  constructor() {}

  buscarUsuario(email: string, contrasena: string) {
    var usu =  this.usuarios.find(e=> e.email.toLowerCase()=== email.toLowerCase() && e.contrasena === contrasena)
    if(usu !== undefined)
    {
      this.usuarioActivo = usu as Usuario;
    }
    return usu;
  }

  registrar(
    email: string,
    contrasena: string,
    contrasena2: string,
    nombre: string,
    apellido: string,
    celular: number
  ): boolean {
    let regexpEmail = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$');
    if (!regexpEmail.test(email)) {
      alert('El email no cumple con el formato');
      return false;
    } else {
      for (let usu of this.usuarios) {
        if (usu.email.toLowerCase() === email.toLowerCase()) {
          alert('El usuario ya existe');
          return false;
        }
      }
      if (contrasena !== contrasena2) {
        alert('Las contraseñas no coninciden');
        return false;
      }
    }
    var usuarioNuevo : Usuario = new Usuario(nombre,apellido,contrasena,email,celular,[],false);
    this.usuarios.push(usuarioNuevo);
    this.usuarioActivo = usuarioNuevo;
    console.log(this.usuarios);

    return true;
  }
}
