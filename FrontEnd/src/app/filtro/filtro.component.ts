import { Component, OnInit } from '@angular/core';
import { TiendaComponent } from '../tienda/tienda.component';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit {

  constructor(private tienda: TiendaComponent) { }

  ngOnInit(): void {
  }

  mostrarProductos(categoria: number)
  {
    this.tienda.filtrarProductos(categoria);
  }

}
