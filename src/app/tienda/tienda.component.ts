import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../servicios/producto.service';
import { Producto, Categoria } from '../Modelos/producto.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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

  public filtrarProductos(categoria: number)
  {
    var productosFiltrados: Producto[] = [];
    if(categoria === -1)
    {
      this.productos = this.productoService.getProductos();
    }
    else 
    for(let pro in this.productoService.getProductos())
    {
      for(let cat in Object.keys(Categoria))
      {
        alert(cat)
      }
      
    }
    
  }
}
