import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/servicios/producto.service';
import { UsuarioService } from '../servicios/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from '../Modelos/usuario.model';
import { RolDTO } from '../DTOs/RolDTO';
import { VentaService } from '../servicios/venta.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public email = '';
  public contrasena = '';
  public check: boolean = false;
  public algo = '';
  public rol:RolDTO = {} as RolDTO

  constructor(
    private usuarioservice: UsuarioService,
    private router: Router,
    private ventaServicio: VentaService
  ) {}

  ngOnInit(): void {}

  public inciarSesion(): void {
    var usuarioTemp: Usuario = new Usuario(
      '',
      '',
      this.contrasena,
      this.email,
      -1,
      [],
    );
    this.usuarioservice.login(usuarioTemp).subscribe(
      (resp) => {
        var token:string  = resp.headers.get('Authorization');
        localStorage.setItem('user', token);
        this.usuarioservice.buscarUsuario(this.email,token).subscribe((data) => {
          var usuario: Usuario = data;
          if (usuario !== undefined) {
            this.usuarioservice.getRol(usuario,token).subscribe(
              data => {
                this.rol = data
                if (this.check && this.rol.nombre==="admin") {
                  localStorage.setItem('admin', token);
                  this.router.navigateByUrl('/admin');
                } else {
                  this.router.navigateByUrl('/inicio');
                }
                this.usuarioservice.usuarioActivo = usuario
              }
            )
          } else {
            alert('Usuario no encontrado');
          }
        });
      },
      (error) => {
        console.log('No se encontró usuario');
        alert('Usuario no encontrado');
      }
    );
  }
}
