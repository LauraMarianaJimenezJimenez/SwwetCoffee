import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Producto, Categoria } from '../Modelos/producto.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
 
  public productos: Producto[] = [];
  constructor(private http:HttpClient) {}

  public getProductos() {
    return this.productos;
  }

  public buscarProducto(nombre:string) : Producto
  {
    for(let pro of this.productos)
    {
      if(nombre === pro.nombre)
      {
        return pro;
      }
    }
    return this.productos[0];
  }

  consultarProductos():Observable<any>
  {
    let url = "http://localhost:8080/productos/getProductos"
    return this.http.get<any>(url);
  }

  actualizarProducto(producto:Producto):Observable<any>
  {
    let url = "http://localhost:8080/productos/actualizar/"+producto.id
    return this.http.put<any>(url,producto);
  }

  agregarProducto(producto:Producto):Observable<any>
  {
    let url = "http://localhost:8080/productos"
    return this.http.post<any>(url,producto)
  }

  eliminarProducto(producto:Producto):Observable<any>
  {
    let url = "http://localhost:8080/productos/eliminar/" + producto.id
    return this.http.delete<any>(url);
  }
}
