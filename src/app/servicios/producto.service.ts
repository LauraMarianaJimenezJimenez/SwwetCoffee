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
    Categoria.BEBIDAS,
    false
  );
  public p2: Producto = new Producto(
    'Cappuccino',
    4000,
    'https://mx.jura.com/-/media/global/images/coffee-recipes/images-redesign-2020/cappuccino_2000x1400px.jpg?h=1400&la=es&w=2000&hash=4D78B3CB71BEC9A3D633DB7A3CF84712E1633670',
    'Café con crema y latte',
    Categoria.BEBIDAS,
    false
  );
  public p3: Producto = new Producto(
    'Mocaccino',
    4000,
    'https://cdn.queapetito.com/wp-content/uploads/2019/05/Mocaccino-o-caf%C3%A9-de-moca-600x469.jpg',
    'Café con crema latte y chocolate',
    Categoria.BEBIDAS,
    false
  );
  public p4: Producto = new Producto(
    'Espresso',
    2000,
    'https://dam.cocinafacil.com.mx/wp-content/uploads/2013/04/cafe-espresso.jpg',
    'Café puro y concentrado',
    Categoria.BEBIDAS,
    false
  );
  public p5: Producto = new Producto(
    'Rollo de Cannella',
    2000,
    'https://www.midiariodecocina.com/wp-content/uploads/2015/08/Rollos-de-canela01.jpg',
    'Rico pastel hecho de canela en forma de espiral',
    Categoria.PASTELERIA,
    false
  );

  public p6: Producto = new Producto(
    'Galletas de Avena',
    1800,
    'https://t2.rg.ltmcdn.com/es/images/3/0/3/galletas_de_avena_faciles_y_rapidas_67303_600_square.jpg',
    'Galleta elaborado en base a la harina de trigo mezclada con el cereal de avena',
    Categoria.PASTELERIA,
    false
  );

  public p7: Producto = new Producto(
    'Croissant de Mantequilla',
    2500,
    'https://okdiario.com/img/2019/01/30/croissant-de-mantequilla.jpg',
    'Croissant salado hecho con masa de hojaldre y margarina',
    Categoria.PASTELERIA,
    false
  );

  public p8: Producto = new Producto(
    'Almojabana',
    1000,
    'https://www.sweetysalado.com/wp-content/uploads/2015/01/DSC_0068N.jpg',
    'Panecillo dulce típico de Latino America',
    Categoria.PASTELERIA,
    false
  );

  public p9: Producto = new Producto(
    'Coffee Scrub 250g',
    12700,
    'https://sc02.alicdn.com/kf/HTB13fYRX5jrK1RjSsplq6xHmVXaS/201628904/HTB13fYRX5jrK1RjSsplq6xHmVXaS.jpg_.webp',
    'Sabor pleno y regusto intenso, con matices caramelizados, gran cuerpo y cremosidad.',
    Categoria.GRANO,
    false
  );

  public p10: Producto = new Producto(
    'Agora Café 200g',
    18000,
    'https://sgfm.elcorteingles.es/SGFM/dctm/MEDIA03/202008/17/00120602000034____6__600x600.jpg',
    'Etiquetas privadas, exfoliante, tratamiento anticelulítico, café Arábica, exfoliante.',
    Categoria.GRANO,
    false
  );
  
  public p11: Producto = new Producto(
    'Café Flores 100g',
    15000,
    'https://sc04.alicdn.com/kf/Ub566bc983a4d433da61e4dc596c50b8ek.jpg',
    'Granos nacionales de café Premium. Grano rojo.',
    Categoria.GRANO,
    false
  );

  public p12: Producto = new Producto(
    'Café Flores 30g',
    8000,
    'https://www.chedraui.com.mx/medias/7506161215893-00-CH1200Wx1200H?context=bWFzdGVyfHJvb3R8MTA3ODQ5fGltYWdlL2pwZWd8aGZhL2gxOC8xMDU3MTc5NTIzNDg0Ni5qcGd8Nzc5ODZmMGNkOGQ2N2FjNDE5ZTQ3YTYyYjc5NjdhYjJlODcxYThiYjllZmQ5NzY1M2I5YTM1M2NmYWVmZmY2YQ',
    'Granos de café Sirianni cubiertos de cocolate, combinación extraordinaria',
    Categoria.GRANO,
    false
  );


  public productos: Producto[] = [this.p7, this.p12, this.p1, this.p8,this.p3, this.p5, this.p9, this.p4, this.p11, this.p2, this.p6, this.p10];
  constructor() {}

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
}
