export enum Categoria {
  BEBIDAS,
  PASTELERIA,
  GRANO,
}

export class Producto {
  constructor(
    public nombre: string,
    public precio: number,
    public imagen: string,
    public descripcion: string,
    public categoria: Categoria
  ) {}
}
