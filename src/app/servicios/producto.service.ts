import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  productos = [{nombre:"café",precio:"2000"}];
  constructor() { }

  public getProductos()
  {
    return this.productos;
  }
}



