enum Categoria { Bebidas, Pasteleria, Grano};
export class Producto 
{
    constructor
    (
        public nombre: string,
        public precio: number,
        public unidades: number,
        public imagen: string,
        public descripcion: string,
        public categoria: string

    )
    {   

    }
}

