import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../servicios/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public nombre ="";
  public apellido ="";
  public email = "";
  public contrasena = "";
  public contrasena2 = "";
  public celular= 0;

  constructor(private usuarioservice:UsuarioService, private router: Router) { }

  ngOnInit(): void {
  }

  public registrarse(): void
  {
    if(this.usuarioservice.registrar(this.email, this.contrasena, this.contrasena2, this.nombre, this.apellido, this.celular))
    {
      alert("Registrado con exito")
      this.router.navigateByUrl('/inicio');
    }
    
  }

}
