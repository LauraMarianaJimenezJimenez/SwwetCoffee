export enum Categoria {
  BEBIDAS,
  PASTELERIA,
  GRANO,
}

export class Producto {

  public id:number = -1;
  public activo:boolean = true;

  constructor(
    public nombre: string,
    public precio: number,
    public imagen: string,
    public descripcion: string,
    public categoria: Categoria,
    public editar: boolean
  ) {}
}
