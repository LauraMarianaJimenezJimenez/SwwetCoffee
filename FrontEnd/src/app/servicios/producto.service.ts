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
    
    let url = "http://sweetcoffee-env.eba-wn3kmhgx.us-east-2.elasticbeanstalk.com/productos/getProductos/"+page+"/"+size
    return this.http.get<any>(url,options);
  }

  consultarProductosByCategoria(page:number, size: number, categoria:number):Observable<any>
  {
    var categoriaString:string
    if(categoria === 0)
    {
      categoriaString = "bebidas"
    }else if(categoria === 1)
    {
      categoriaString = "pasteleria"
    }else{
      categoriaString = "grano"
    }
    const headerDict = {
      'Authorization': localStorage.getItem('user') as any
    }
    let options = {
      headers: new HttpHeaders(headerDict)
    }
    
    let url = "http://sweetcoffee-env.eba-wn3kmhgx.us-east-2.elasticbeanstalk.com/productos/getProductosCategoria/"+categoriaString + "/"+page+"/"+size
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

    let url = "http://sweetcoffee-env.eba-wn3kmhgx.us-east-2.elasticbeanstalk.com/productos/actualizar/"+producto.id
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

    let url = "http://sweetcoffee-env.eba-wn3kmhgx.us-east-2.elasticbeanstalk.com/productos"
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

    let url = "http://sweetcoffee-env.eba-wn3kmhgx.us-east-2.elasticbeanstalk.com/productos/eliminar/" + producto.id
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

    let url = "http://sweetcoffee-env.eba-wn3kmhgx.us-east-2.elasticbeanstalk.com/items/getItemsProducto/"+producto.id
    return this.http.get<any>(url,options);
  }
}
