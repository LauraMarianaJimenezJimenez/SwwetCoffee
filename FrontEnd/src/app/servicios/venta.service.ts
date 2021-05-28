import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Venta } from 'src/app/Modelos/venta.model';
import { ProductoService } from './producto.service';
import { UsuarioService } from './usuario.service';
import { Observable } from 'rxjs';
import { VentaDTO } from '../DTOs/VentaDTO';
import { Item } from '../Modelos/item.model';
import { Usuario } from '../Modelos/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
   
   public ventas: Venta[] = []
   public ventaProceso: Venta = {} as Venta;

  constructor(private servicioProducto : ProductoService, private servicioUsuario : UsuarioService, private http:HttpClient) {
    servicioUsuario.usuario1.compras = [];

   }
  public agregarVenta(ventaNueva : Venta):Observable<any>
  {
    ventaNueva.usuario = this.servicioUsuario.usuarioActivo;
    const headerDict = {
      'Authorization': localStorage.getItem('user') as any
    }
    let options = {
      headers: new HttpHeaders(headerDict)
    }
    
    let url = "http://sweetcoffee-env.eba-wn3kmhgx.us-east-2.elasticbeanstalk.com/ventas"
    return this.http.post<any>(url,ventaNueva, options);
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
    
    let url = "http://sweetcoffee-env.eba-wn3kmhgx.us-east-2.elasticbeanstalk.com/ventas/getVentas/" + page+ "/" + size
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

    let url = "http://sweetcoffee-env.eba-wn3kmhgx.us-east-2.elasticbeanstalk.com/ventas/getVentasMes/"+ mes + "/" + page+ "/" + size
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
    let url = "http://sweetcoffee-env.eba-wn3kmhgx.us-east-2.elasticbeanstalk.com/ventas/getTotalVentas"
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

    let url = "http://sweetcoffee-env.eba-wn3kmhgx.us-east-2.elasticbeanstalk.com/items/getItemsVenta/"+venta.id + "/" + page+ "/" + size
    return this.http.get<any>(url,options);
  }

  agregarItemsVenta(items : Item[]):Observable<any>
  {
    const headerDict = {
      'Authorization': localStorage.getItem('user') as any
    }
    let options = {
      headers: new HttpHeaders(headerDict)
    }

    let url = "http://sweetcoffee-env.eba-wn3kmhgx.us-east-2.elasticbeanstalk.com/items/agregarItems"
    return this.http.post<any>(url,items, options);
  }

  consultarComprasByEmail(usuarioActivo: Usuario, page: number, size: number)
   {

    const headerDict = {
      'Authorization': localStorage.getItem('user') as any
    }
    let options = {
      headers: new HttpHeaders(headerDict)
    }

    let url = "http://sweetcoffee-env.eba-wn3kmhgx.us-east-2.elasticbeanstalk.com/ventas/getVentasUsuario/"+ usuarioActivo.email + "/" + page+ "/" + size
    return this.http.get<any>(url, options);
  }
}
