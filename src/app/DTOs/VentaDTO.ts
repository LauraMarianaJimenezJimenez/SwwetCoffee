import { ItemDTO } from "./ItemDTO";

export class VentaDTO{
    
    constructor
    (
        
        public fecha: string,
        public id: number,
        public valor: number,
        public nombreUsuario: string,
        public items:ItemDTO[]
    )
    { }
}