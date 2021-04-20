import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../Modelos/usuario.model';
import { Venta } from '../Modelos/venta.model';
import { UsuarioService } from '../servicios/usuario.service';



@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  public usuarioActivo: Usuario = {} as Usuario;
  public compraDetalle : Venta = {} as Venta;
  public detalle : boolean = false;
  constructor(private router:Router,private servicioUsuario: UsuarioService) { }

  ngOnInit(): void {

    this.usuarioActivo = this.servicioUsuario.usuarioActivo;
  }

  public verDetalle(compraDetalle: Venta)
  {
    if(!this.detalle)
    {
      this.compraDetalle = compraDetalle;
      this.detalle = true;
    }
      
  }

  public salirDetalle()
  {
    if(this.detalle)
    {
      this.detalle = false;
      this.compraDetalle = {} as Venta;
    }
  }



}
