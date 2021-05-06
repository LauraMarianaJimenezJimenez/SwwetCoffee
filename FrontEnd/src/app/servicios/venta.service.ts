import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  consultarVentas(page:number, size:number):Observable<any>
  {
    const headerDict = {
      'Authorization': localStorage.getItem('admin') as any
    }
    let options = {
      headers: new HttpHeaders(headerDict)
    }
    
    let url = "http://localhost:8080/ventas/getVentas/" + page+ "/" + size
    return this.http.get<any>(url, options);
  }

  consultarVentasByMes(mes:number, page:number, size:number):Observable<any>
  {
    const headerDict = {
      'Authorization': localStorage.getItem('admin') as any
    }
    let options = {
      headers: new HttpHeaders(headerDict)
    }

    let url = "http://localhost:8080/ventas/getVentasMes/"+ mes + "/" + page+ "/" + size
    return this.http.get<any>(url, options);
  }

  consultarTotalVentas(mes:number):Observable<any>
  {
    const headerDict = {
      'Authorization': localStorage.getItem('admin') as any
    }
    let options = {
      headers: new HttpHeaders(headerDict)
    }
    let url = "http://localhost:8080/ventas/getTotalVentas"
    if(mes != 0)
    {
      url = url + "?mes=" + mes
    }
    return this.http.get<any>(url, options);
  }

  consultarItemsVenta(venta : VentaDTO, page:number, size:number):Observable<any>
  {
    const headerDict = {
      'Authorization': localStorage.getItem('user') as any
    }
    let options = {
      headers: new HttpHeaders(headerDict)
    }

    let url = "http://localhost:8080/items/getItemsVenta/"+venta.id + "/" + page+ "/" + size
    return this.http.get<any>(url,options);
  }
}
