import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/Modelos/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public usuario1: Usuario = new Usuario(
    'Chucho',
    'Perez',
    '12345',
    'raulperez@gmail.com',
    300,
    [],
    false
  );
  public admin: Usuario = new Usuario(
    'Maria',
    'Martinez',
    'Admin',
    'mariamartinez@gmail.com',
    301,
    [],
    true
  );
  public usuarios: Usuario[] = [this.usuario1, this.admin];

  public usuarioActivo: Usuario = this.admin;
  constructor() {}

  buscarUsuario(email: string, contrasena: string): boolean {
    for (let usu of this.usuarios) {
      if (usu.email === email && usu.contrasena === contrasena) {
        this.usuarioActivo = usu;
        return true;
      }
    }
    return false;
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
        if (usu.email === email) {
          alert('El usuario ya existe');
          return false;
        }
      }
      if (contrasena !== contrasena2) {
        alert('Las contraseñas no coninciden');
        return false;
      }
    }
    return true;
  }
}
