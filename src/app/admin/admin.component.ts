import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from '../Modelos/producto.model';
import { ProductoService } from '../servicios/producto.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public productos: Producto[] = [];

  constructor(private productoServicio : ProductoService, private router: Router) { }

  ngOnInit(): void {
   this.productos= this.productoServicio.getProductos()
  }

  public editar(prod:Producto)
  {
    prod.editar = true;
  }

}
