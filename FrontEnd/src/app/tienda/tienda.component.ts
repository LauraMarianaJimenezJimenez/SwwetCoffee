import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../servicios/producto.service';
import { Producto, Categoria } from '../Modelos/producto.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Venta } from '../Modelos/venta.model';
import { NgForm } from '@angular/forms';
import { VentaService } from '../servicios/venta.service';
import { Router } from '@angular/router';
import { Usuario } from '../Modelos/usuario.model';
import { Item } from '../Modelos/item.model';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css'],
})
export class TiendaComponent implements OnInit {
  public productos: Producto[] = [];
  public venta: Venta =  {} as Venta
  public productosAgregados : Item[] = []

  //Filtro
  public filtroActual:number = -1;

   //Paginación Productos
   public sizePagina: number = 6;
   public pagina:number = 0;
   public primeraPagina:boolean = true
   public ultimaPagina:boolean = false;
 

  constructor(private productoService: ProductoService, private ventaService: VentaService, private router:Router) {}

  ngOnInit(): void {
    this.consultarProductos();
  }

  consultarProductos()
  {
    this.productoService.consultarProductos(this.pagina, this.sizePagina).subscribe(
      data=>{
        this.productos = data.content
        this.ultimaPagina = data.last
        this.primeraPagina = data.first
      },
      error=>console.log("error al consultar las ventas")
    );
  }

  public filtrarProductos(categoria: number) {
  
    if(categoria !== this.filtroActual)
    {
      this.pagina = 0
      this.filtroActual = categoria
    }
    if (categoria === -1) {
      this.consultarProductos();
    } else {
      this.productoService.consultarProductosByCategoria(this.pagina, this.sizePagina,categoria).subscribe(
        data=>{
          this.productos = data.content
          this.ultimaPagina = data.last
          this.primeraPagina = data.first
        },
        error=>console.log("error al consultar los productos")
      );
    }
  }

  public clickNext()
{
  if(!this.ultimaPagina)
  {
    this.pagina++
    this.filtrarProductos(this.filtroActual)
  }
}

public clickBack()
{
  if(!this.primeraPagina)
  {
    this.pagina--
    this.filtrarProductos(this.filtroActual)
  }
}

  public agregarItem(prod:Producto, canti:number)
  {
    var nuevo:boolean = true; 
    for(let agre of this.productosAgregados)
    {
      if(agre.producto.id === prod.id)
      {
        agre.cantidad ++;
        nuevo = false;
      }
    }
    if(nuevo)
    {
      var itemNuevo:Item = new Item(prod.precio,canti,this.venta,prod)
      this.productosAgregados.push(itemNuevo);
      
    }
    alert("Producto añadido al carrito");
  
  }

  public realizarCompra()
  {
    var fecha:string = this.ventaService.obtenerFechaHoy();
    this.venta = new Venta(fecha,-1,this.productosAgregados,{} as Usuario);
    this.venta.items=[];
    this.ventaService.agregarVenta(this.venta).subscribe(
      data =>{
        this.ventaService.ventaProceso = data;
        this.ventaService.ventaProceso.items = this.productosAgregados;
        this.router.navigateByUrl('/resumen-compra');
      },
      error=>
      {
        console.log("Error al agregar una venta")
      }
    );
  }
}
