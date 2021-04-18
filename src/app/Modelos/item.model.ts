import { Producto } from "./producto.model";
import { Venta } from "./venta.model";

export class Item
{
    public id: number = -1
    constructor
    (
        public precioVenta: number,
        public cantidad:number,
        public venta:Venta,
        public producto:Producto
    ){}
}