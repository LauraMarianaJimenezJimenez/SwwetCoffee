import { Component, OnInit } from '@angular/core';
import{ProductoService} from "src/app/servicios/producto.service";
import { UsuarioService } from '../servicios/usuario.service';

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

  constructor(private usuarioservice:UsuarioService){ }

  ngOnInit(): void {
    

  }

  public inciarSesion():void
  {
    alert(this.email)
  }

}
