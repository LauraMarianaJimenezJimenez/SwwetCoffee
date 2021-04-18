import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VentaDTO } from '../DTOs/VentaDTO';
import { Usuario } from '../Modelos/usuario.model';
import { Venta } from '../Modelos/venta.model';
import { VentaService } from '../servicios/venta.service';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})


export class ReporteComponent implements OnInit {

  public ventas: VentaDTO[] = []
  public todasVentas:VentaDTO[] = []
  public ventaDetalle : VentaDTO = {} as VentaDTO;
  public detalle: boolean = false;
  public valorTotalVenta = 0;

  constructor(private servicioVenta: VentaService) { }

  ngOnInit(): void {

    this.servicioVenta.consultarVentas().subscribe(
      data=>{
        this.ventas = data
        this.todasVentas = data
        this.calcularTotalVentas();
      },
      error=>console.log("error al consultar las ventas")
    );
    
  }

  public verDetalle(ventaDetalle: VentaDTO)
  {
    if(!this.detalle)
    {
      this.ventaDetalle = ventaDetalle;
      this.servicioVenta.consultarItemsVenta(ventaDetalle).subscribe(
        data =>{
          this.ventaDetalle.items = data;
        },
        error=>"No se pudo consultar los items de esta venta"
      )
      this.detalle = true;
    }
      
  }

  public salirDetalle()
  {
    if(this.detalle)
    {
      this.detalle = false;
      this.ventaDetalle = {} as VentaDTO;
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
    var ventasFiltradas: VentaDTO[] = []
    if(mes === '-0-')
    {
      this.ventas = this.todasVentas;
    }
    else
    {
      for(let venta of this.todasVentas)
      {
        if(venta.fecha.includes(mes))
        {
          ventasFiltradas.push(venta);
        }
      }
      this.ventas = ventasFiltradas;
    }
    this.calcularTotalVentas();
  }

  

}
