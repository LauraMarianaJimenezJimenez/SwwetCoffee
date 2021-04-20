import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Venta } from 'src/app/Modelos/venta.model';
import { ProductoService } from './producto.service';
import { UsuarioService } from './usuario.service';
import { Observable } from 'rxjs';
import { VentaDTO } from '../DTOs/VentaDTO';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
   
   public ventas: Venta[] = []
   public ventaProceso: Venta = {} as Venta

  constructor(private servicioProducto : ProductoService, private servicioUsuario : UsuarioService, private http:HttpClient) {
    servicioUsuario.usuario1.compras = [];

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

  consultarVentas():Observable<any>
  {
    let url = "http://localhost:8080/ventas/getVentas"
    return this.http.get<any>(url);
  }

  consultarItemsVenta(venta : VentaDTO):Observable<any>
  {
    let url = "http://localhost:8080/items/getItemsVenta/"+venta.id
    return this.http.get<any>(url);
  }
}
