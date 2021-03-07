import { Injectable } from '@angular/core';
import { Venta } from 'src/app/Modelos/venta.model';
import { ProductoService } from './producto.service';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  public venta1: Venta = new Venta(
    '06/03/2021',
    0,
    [{producto: this.servicioProducto.p2, cantidad: 1}, {producto: this.servicioProducto.p10, cantidad:2}],
    this.servicioUsuario.usuario1
   )

   public venta2: Venta = new Venta(
    '06/12/2021',
    3,
    [{producto: this.servicioProducto.p4, cantidad: 3}, {producto: this.servicioProducto.p12, cantidad:2}, {producto: this.servicioProducto.p9, cantidad:1}],
    this.servicioUsuario.usuario1
   )
   
   public ventas: Venta[] = [this.venta1, this.venta2]
   public ventaProceso: Venta = {} as Venta

  constructor(private servicioProducto : ProductoService, private servicioUsuario : UsuarioService) {
    servicioUsuario.usuario1.compras = [this.venta1,this.venta2];

   }
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
