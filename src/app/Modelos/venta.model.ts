import { Item } from './item.model'
import { Usuario } from './usuario.model';

export class Venta{
    
    public valor: number;
    constructor
    (
        
        public fecha: string,
        public id: number,
        public items:Item[],
        public usuario: Usuario

    )
    {
        this.valor = this.calcularValorTotal();
    }

    calcularValorTotal(): number
    {
        var valorTotal: number = 0;
        for(let entry of this.items)
        {
            valorTotal = valorTotal + (entry.cantidad * entry.precioVenta);
        }
        return valorTotal;
    }
    
}

