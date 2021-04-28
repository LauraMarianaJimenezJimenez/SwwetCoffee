import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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

  consultarProductos(page:number,size:number):Observable<any>
  {
    const headerDict = {
      'Authorization': localStorage.getItem('user') as any
    }
    let options = {
      headers: new HttpHeaders(headerDict)
    }
    
    let url = "http://localhost:8080/productos/getProductos/"+page+"/"+size
    return this.http.get<any>(url,options);
  }

  actualizarProducto(producto:Producto):Observable<any>
  {
    const headerDict = {
      'Authorization': localStorage.getItem('admin') as any
    }
    let options = {
      headers: new HttpHeaders(headerDict)
    }

    let url = "http://localhost:8080/productos/actualizar/"+producto.id
    return this.http.put<any>(url,producto,options);
  }

  agregarProducto(producto:Producto):Observable<any>
  {
    const headerDict = {
      'Authorization': localStorage.getItem('admin') as any
    }
    let options = {
      headers: new HttpHeaders(headerDict)
    }

    let url = "http://localhost:8080/productos"
    return this.http.post<any>(url,producto,options)
  }

  eliminarProducto(producto:Producto):Observable<any>
  {
    const headerDict = {
      'Authorization': localStorage.getItem('admin') as any
    }
    let options = {
      headers: new HttpHeaders(headerDict)
    }

    let url = "http://localhost:8080/productos/eliminar/" + producto.id
    return this.http.delete<any>(url,options);
  }

  consultarItemsProducto(producto:Producto):Observable<any>
  {
    const headerDict = {
      'Authorization': localStorage.getItem('admin') as any
    }
    let options = {
      headers: new HttpHeaders(headerDict)
    }

    let url = "http://localhost:8080/items/getItemsProducto/"+producto.id
    return this.http.get<any>(url,options);
  }
}
