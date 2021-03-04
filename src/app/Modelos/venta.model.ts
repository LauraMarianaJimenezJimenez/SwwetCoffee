import { Producto } from 'src/app/Modelos/producto.model';
import { Usuario } from './usuario.model';

export class Venta{
    
    public valor: number;
    constructor
    (
        
        public fecha: string,
        public id: number,
        public productos: {producto: Producto, cantidad: number}[],
        public usuario: Usuario

    )
    {
        this.valor = this.calcularValorTotal();
    }

    calcularValorTotal(): number
    {
        var valorTotal: number = 0;
        for(let entry of this.productos)
        {
            valorTotal = valorTotal + (entry.cantidad * entry.producto.precio);
        }
        return valorTotal;
    }
    
}

