import { Venta } from 'src/app/Modelos/venta.model'; 

export class Usuario
{
    constructor
    (
        public nombre: string,
        public apellido: string,
        public contrasena: string,
        public email: string,
        public celular: number,
        public compras: Venta[],
    )
    {

    }
}