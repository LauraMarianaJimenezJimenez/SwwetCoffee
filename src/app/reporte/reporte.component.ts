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
  public valorTotalVenta = 0;

  constructor(private servicioVenta: VentaService) { }

  ngOnInit(): void {

    this.ventas = this.servicioVenta.ventas; 
    this.calcularTotalVentas();
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

  public calcularTotalVentas()
  {
    this.valorTotalVenta = 0;
    for(let venta of this.ventas)
    {
      this.valorTotalVenta = this.valorTotalVenta + venta.valor;
    }
  }

  public filtrarVentas(mes:string)
  {
    var ventasFiltradas: Venta[] = []
    if(mes === '/0/')
    {
      this.ventas = this.servicioVenta.ventas
    }
    else
    {
      for(let venta of this.servicioVenta.ventas)
      {
        if(venta.fecha.includes(mes))
        {
          ventasFiltradas.push(venta);
        }
      }
      this.ventas = ventasFiltradas;
      this.calcularTotalVentas();
    }
    
  }

  

}
