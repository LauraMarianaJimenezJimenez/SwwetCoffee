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
  public ventaDetalle : VentaDTO = {} as VentaDTO;
  public detalle: boolean = false;
  public valorTotalVenta = 0;

  //Filtro
  public filtroActual:number = 0;

  //Paginación
  public sizePagina: number = 10;
  public pagina:number = 0;
  public primeraPagina:boolean = true
  public ultimaPagina:boolean = false;

  constructor(private servicioVenta: VentaService) { }

  ngOnInit(): void {

   this.consultarVentas()
    
  }

  consultarVentas()
  {
    this.servicioVenta.consultarVentas(this.pagina, this.sizePagina).subscribe(
      data=>{
        this.ventas = data.content
        this.calcularTotalVentas();
        this.ultimaPagina = data.last
        this.primeraPagina = data.first
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

  public filtrarVentas(mes:number)
  {
    if(mes !== this.filtroActual)
    {
      this.pagina = 0
      this.filtroActual = mes
    }
    if(mes === 0)
    {
      this.consultarVentas();
    }
    else
    {
      this.servicioVenta.consultarVentasByMes(mes,this.pagina, this.sizePagina).subscribe(
        data=>{
          this.ventas = data.content
          this.ultimaPagina = data.last
          this.primeraPagina = data.first
          this.calcularTotalVentas();
        },
        error=>console.log("error al consultar las ventas")
      );
  }
}

public clickNext()
{
  if(!this.ultimaPagina)
  {
    this.pagina++
    this.filtrarVentas(this.filtroActual)
  }
}

public clickBack()
{
  if(!this.primeraPagina)
  {
    this.pagina--
    this.filtrarVentas(this.filtroActual)
  }
}

  

}
