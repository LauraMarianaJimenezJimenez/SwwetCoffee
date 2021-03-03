import { Injectable } from '@angular/core';
import { Venta } from 'src/app/Modelos/venta.model';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  public ventas: Venta[] = []
  constructor() { }

  public agregarVenta(ventaNueva : Venta)
  {
    this.ventas.push(ventaNueva);
  }
}
