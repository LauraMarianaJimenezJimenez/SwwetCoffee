import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
  );
  public admin: Usuario = new Usuario(
    'Maria',
    'Martinez',
    'Admin',
    'admin@gmail.com',
    301,
    [],
  );


  public usuarios: Usuario[] = [this.usuario1, this.admin];

  public usuarioActivo: Usuario = {} as Usuario
  constructor(private http:HttpClient) {}

  buscarUsuario(email: string, token:string):Observable<any> {
    const headerDict = {
      'Authorization': token
    }
    let options = {
      headers: new HttpHeaders(headerDict)
    }

    let url = "http://localhost:8080/usuarios/getUsuario/" + email
    return this.http.get<any>(url,options)
  }

  login(usuario:Usuario):Observable<any>
  {
    let url = "http://localhost:8080/login"
    return this.http.post<any>(url,usuario,{observe: 'response'})
  }

  getRol(usuario:Usuario, token:string):Observable<any>
  {
    const headerDict = {
      'Authorization': token
    }
    let options = {
      headers: new HttpHeaders(headerDict)
    }
    let url = "http://localhost:8080/usuarios/getRol/" + usuario.email
    return this.http.get<any>(url,options)
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
    var usuarioNuevo : Usuario = new Usuario(nombre,apellido,contrasena,email,celular,[]);
    this.usuarios.push(usuarioNuevo);
    this.usuarioActivo = usuarioNuevo;
    localStorage.setItem('user',usuarioNuevo.email);

    return true;
  }
}
