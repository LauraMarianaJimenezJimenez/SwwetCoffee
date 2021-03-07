import { Component, OnInit } from '@angular/core';
import{ProductoService} from "src/app/servicios/producto.service";
import { UsuarioService } from '../servicios/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from '../Modelos/usuario.model';
import { VentaService } from '../servicios/venta.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email = "";
  public contrasena = "";
  public check : boolean = false;
  public algo ="";

  constructor(private usuarioservice:UsuarioService, private router: Router, private ventaServicio: VentaService){ }

  ngOnInit(): void {
    

  }

  public inciarSesion():void
  {
    let usuario = this.usuarioservice.buscarUsuario(this.email, this.contrasena);
    if(usuario !== undefined)
    {
      if(this.check && usuario.admin)
      {
        localStorage.setItem('user',usuario.email);
        this.router.navigateByUrl('/admin')
      }        
      else
      {
        localStorage.setItem('user',usuario.email);
        this.router.navigateByUrl('/inicio');
      } 
    }
    else{
      alert("Usuario no encontrado")
    }
  }

}
