import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VentaDTO } from '../DTOs/VentaDTO';
import { Usuario } from '../Modelos/usuario.model';
import { Venta } from '../Modelos/venta.model';
import { UsuarioService } from '../servicios/usuario.service';
import { VentaService } from '../servicios/venta.service';



@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  public usuarioActivo: Usuario = {} as Usuario;
  public compraDetalle : VentaDTO = {} as VentaDTO;
  public detalle : boolean = false;

   //Paginación Compras
   public sizePagina: number = 10;
   public pagina:number = 0;
   public primeraPagina:boolean = true
   public ultimaPagina:boolean = false;

   //Paginción items
  public sizePaginaItem: number = 5;
  public paginaItem:number = 0;
  public primeraPaginaItem:boolean = true
  public ultimaPaginaItem:boolean = false;

  constructor(private router:Router,private servicioUsuario: UsuarioService, private servicioVenta:VentaService) { }

  ngOnInit(): void {

    this.usuarioActivo = this.servicioUsuario.usuarioActivo;
    this.consultarComprasUsuarioActivo()
  }

  consultarComprasUsuarioActivo()
  {
    this.servicioVenta.consultarComprasByEmail(this.usuarioActivo, this.pagina, this.sizePagina).subscribe(
      data=>{
        this.usuarioActivo.compras = data.content
        this.ultimaPagina = data.last
        this.primeraPagina = data.first
      },
      error=>console.log("error al consultar las ventas")
    );
  }

  public verDetalle(compraDetalle: Venta)
  {
    if(!this.detalle)
    {
      this.compraDetalle = new VentaDTO(compraDetalle.fecha,compraDetalle.id,compraDetalle.valor,this.usuarioActivo.nombre,[]);
      this.detalle = true;
      this.consultarItemsCompra()
    }
      
  }

  public salirDetalle()
  {
    if(this.detalle)
    {
      this.detalle = false;
      this.compraDetalle = {} as VentaDTO;
    }
  }

  public consultarItemsCompra()
  {
    this.servicioVenta.consultarItemsVenta(this.compraDetalle, this.paginaItem, this.sizePaginaItem).subscribe(
      data =>{
        this.compraDetalle.items = data.content;
        this.ultimaPaginaItem = data.last
        this.primeraPaginaItem = data.first
      },
      error=>"No se pudo consultar los items de esta compra"
    )
  }

  public clickNext()
  {
    if(!this.ultimaPagina)
    {
      this.pagina++
      this.consultarComprasUsuarioActivo()
    }
  }
  
  public clickBack()
  {
    if(!this.primeraPagina)
    {
      this.pagina--
      this.consultarComprasUsuarioActivo()
    }
  }
  
  public clickNextItem()
  {
    if(!this.ultimaPaginaItem)
    {
      this.paginaItem++
      this.consultarItemsCompra()
    }
  }
  
  public clickBackItem()
  {
    if(!this.primeraPaginaItem)
    {
      this.paginaItem--
      this.consultarItemsCompra()
    }
  }

}
