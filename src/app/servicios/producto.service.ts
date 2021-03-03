import { Injectable } from '@angular/core';
import { Producto, Categoria } from '../Modelos/producto.model';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  public p1: Producto = new Producto(
    'Frappuccino',
    5000,
    'https://globalassets.starbucks.com/assets/87ab7a1c8b7b492cbc1d5c5d44e1007b.jpg?impolicy=1by1_wide_1242',
    'Café helado con crema chantilly mediano',
    Categoria.BEBIDAS
  );
  public p2: Producto = new Producto(
    'Cappuccino',
    4000,
    'https://mx.jura.com/-/media/global/images/coffee-recipes/images-redesign-2020/cappuccino_2000x1400px.jpg?h=1400&la=es&w=2000&hash=4D78B3CB71BEC9A3D633DB7A3CF84712E1633670',
    'Café con crema y latte',
    Categoria.BEBIDAS
  );
  public p3: Producto = new Producto(
    'Mocaccino',
    4000,
    'https://cdn.queapetito.com/wp-content/uploads/2019/05/Mocaccino-o-caf%C3%A9-de-moca-600x469.jpg',
    'Café con crema latte y chocolate',
    Categoria.BEBIDAS
  );
  public p4: Producto = new Producto(
    'Espresso',
    2000,
    'https://dam.cocinafacil.com.mx/wp-content/uploads/2013/04/cafe-espresso.jpg',
    'Café puro y concentrado',
    Categoria.BEBIDAS
  );
  public p5: Producto = new Producto(
    'Rollo de Cannella',
    2000,
    'https://www.midiariodecocina.com/wp-content/uploads/2015/08/Rollos-de-canela01.jpg',
    'Rico pastel hecho de canela en forma de espiral',
    Categoria.PASTELERIA
  );
  public productos: Producto[] = [this.p1, this.p2, this.p3, this.p4,this.p5];
  constructor() {}

  public getProductos() {
    return this.productos;
  }
}
