import { Injectable } from '@angular/core';
import { Venta } from 'src/app/Modelos/venta.model';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  public ventas: Venta[] = []
  public ventaProceso: Venta = {} as Venta
  constructor() { }

  public agregarVenta(ventaNueva : Venta)
  {
    this.ventaProceso = ventaNueva;
  }

  public obtenerFechaHoy(): string
  {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    var todayString = dd + '/' + mm + '/' + yyyy;

    return todayString;
  }
}
