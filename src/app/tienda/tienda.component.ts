import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../servicios/producto.service';
import { Producto, Categoria } from '../Modelos/producto.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css'],
})
export class TiendaComponent implements OnInit {
  public productos: Producto[] = [];
  public numbers: number[] = [];

  constructor(private productoService: ProductoService) {}

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
}
