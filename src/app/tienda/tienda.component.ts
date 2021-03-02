import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../servicios/producto.service';
import { Producto, Categoria } from '../Modelos/producto.model';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {
  public productos:Producto[] = []
  public numbers : number []  = [];

  constructor(private productoService:ProductoService) { }

  ngOnInit(): void {
    this.productos = this.productoService.getProductos()
    for(var i = 1; i <= 20; i++)
    {
      this.numbers.push(i);
    }
  }

}
