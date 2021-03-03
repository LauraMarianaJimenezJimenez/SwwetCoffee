import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../servicios/producto.service';
import { Producto, Categoria } from '../Modelos/producto.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Venta } from '../Modelos/venta.model';
import { NgForm } from '@angular/forms';
import { VentaService } from '../servicios/venta.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css'],
})
export class TiendaComponent implements OnInit {
  public productos: Producto[] = [];
  public venta: Venta =  new Venta("",0,[]);
  public productosAgregados :{producto: Producto, cantidad: number}[] = []
  public numbers: number[] = [];

  //Inflate
  public numero:number = 0

  constructor(private productoService: ProductoService, private ventaService: VentaService) {}

  ngOnInit(): void {
    this.productos = this.productoService.getProductos();
    for (var i = 1; i <= 20; i++) {
      this.numbers.push(i);
    }
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

  public agregarProducto(nombre:string, canti:number)
  {
    var nuevo:boolean = true; 
    for(let agre of this.productosAgregados)
    {
      if(agre.producto.nombre === nombre)
      {
        agre.cantidad ++;
        nuevo = false;
      }
    }
    if(nuevo)
    {
      var pro:Producto =  this.productoService.buscarProducto(nombre);
      var algo:{producto: Producto, cantidad: number} = {producto:pro,cantidad:canti};
      this.productosAgregados.push(algo);
      
    }
    console.log(this.productosAgregados)
    alert("Producto añadido al carrito");
  
  }

  public realizarCompra()
  {
    var fecha:string = this.ventaService.obtenerFechaHoy();
    /* this.venta = new Venta() */
  }
}
