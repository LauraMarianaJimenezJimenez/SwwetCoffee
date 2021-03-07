import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../Modelos/usuario.model';
import { Venta } from '../Modelos/venta.model';
import { VentaService } from '../servicios/venta.service';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})


export class ReporteComponent implements OnInit {

  public ventas: Venta[] = []
  public ventaDetalle : Venta = {} as Venta;
  public detalle: boolean = false;

  constructor(private servicioVenta: VentaService) { }

  ngOnInit(): void {

    this.ventas = this.servicioVenta.ventas; 
  }

  public verDetalle(ventaDetalle: Venta)
  {
    if(!this.detalle)
    {
      this.ventaDetalle = ventaDetalle;
      this.detalle = true;
    }
      
  }

  public salirDetalle()
  {
    if(this.detalle)
    {
      this.detalle = false;
      this.ventaDetalle = {} as Venta;
    }
  }

}
