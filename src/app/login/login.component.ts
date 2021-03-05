import { Component, OnInit } from '@angular/core';
import{ProductoService} from "src/app/servicios/producto.service";
import { UsuarioService } from '../servicios/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from '../Modelos/usuario.model';

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

  constructor(private usuarioservice:UsuarioService, private router: Router){ }

  ngOnInit(): void {
    

  }

  public inciarSesion():void
  {
    let usuario = this.usuarioservice.buscarUsuario(this.email, this.contrasena);
    if(usuario !== undefined)
    {
      if(this.check && usuario.admin)
      {
        this.router.navigateByUrl('/admin')
      }        
      else
      {
        this.router.navigateByUrl('/inicio');
      } 
    }
    else{
      alert("Usuario no encontrado")
    }
  }

}
