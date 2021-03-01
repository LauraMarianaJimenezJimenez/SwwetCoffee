import { Component, OnInit } from '@angular/core';

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
  public celular=0;

  constructor() { }

  ngOnInit(): void {
  }

  registrarse(): void
  {
    alert(this.nombre + " " + this.apellido + " " + this.celular + 
    " " + this.contrasena  + " " + this.contrasena2  + " " + this.email  + " " + this.celular)
  }

}
