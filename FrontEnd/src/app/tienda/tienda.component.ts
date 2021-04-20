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

  constructor(private productoService: ProductoService, private ventaService: VentaService, private router:Router) {}

  ngOnInit(): void {
    this.productos = this.productoService.getProductos();
  }

  public filtrarProductos(categoria: number) {
    var productosFiltrados: Producto[] = [];
    if (categoria === -1) {
      this.productos = this.productoService.getProductos();
    } else {
      for (let pro of this.productoService.getProductos()) {
        if (categoria === Categoria.BEBIDAS && pro.categoria === Categoria.BEBIDAS)
        {
          productosFiltrados.push(pro);
        }
        if (categoria === Categoria.PASTELERIA && pro.categoria === Categoria.PASTELERIA)
        {
          productosFiltrados.push(pro);
        }
        if (categoria === Categoria.GRANO && pro.categoria === Categoria.GRANO)
        {
          productosFiltrados.push(pro);
        }
      }
      this.productos = productosFiltrados;
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
    var id:number = -1;
    this.venta = new Venta(fecha,id,this.productosAgregados,{} as Usuario);
    this.ventaService.agregarVenta(this.venta);
    this.router.navigateByUrl('/resumen-compra');
  }
}
