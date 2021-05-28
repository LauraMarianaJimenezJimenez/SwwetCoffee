import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VentaDTO } from '../DTOs/VentaDTO';
import { VentaTotalDTO } from '../DTOs/VentaTotalDTO';
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

  //VentaTotalDTO
  public ventaTotal:VentaTotalDTO = {} as VentaTotalDTO;

  //Filtro
  public filtroActual:number = 0;

  //Paginación Ventas
  public sizePagina: number = 10;
  public pagina:number = 0;
  public primeraPagina:boolean = true
  public ultimaPagina:boolean = false;

  //Paginción items
  public sizePaginaItem: number = 5;
  public paginaItem:number = 0;
  public primeraPaginaItem:boolean = true
  public ultimaPaginaItem:boolean = false;

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
      this.detalle = true;
      this.ventaDetalle = ventaDetalle;
      this.consultarItemsVenta()
    }
      
  }

  public salirDetalle()
  {
    if(this.detalle)
    {
      this.detalle = false;
      this.ventaDetalle = {} as VentaDTO;
      this.paginaItem = 0;
    }
  }

  public consultarItemsVenta()
  {
    this.servicioVenta.consultarItemsVenta(this.ventaDetalle, this.paginaItem, this.sizePaginaItem).subscribe(
      data =>{
        this.ventaDetalle.items = data.content;
        this.ultimaPaginaItem = data.last
        this.primeraPaginaItem = data.first
      },
      error=>"No se pudo consultar los items de esta venta"
    )
  }

  public calcularTotalVentas()
  {
    this.servicioVenta.consultarTotalVentas(this.filtroActual).subscribe(
      data => {
        this.ventaTotal = data
      },
      error => 
      {
        console.log("No se pudo recuperar el total de las ventas")
        this.ventaTotal.numeroTotalVentas = 0;
        this.ventaTotal.valorTotalVentas = 0;
      }
    )
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

public clickNextItem()
{
  if(!this.ultimaPaginaItem)
  {
    this.paginaItem++
    this.consultarItemsVenta()
  }
}

public clickBackItem()
{
  if(!this.primeraPaginaItem)
  {
    this.paginaItem--
    this.consultarItemsVenta()
  }
}


}
