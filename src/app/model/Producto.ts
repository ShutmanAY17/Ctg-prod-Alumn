import { Categoria } from "./Categoria";

export class Producto{
    idProducto: number = 0;
    nombreProducto: string = '';
    descripcionProducto: string = '';
    existencia: number = 0;
    precio: number = 0;
    categoria: Categoria = new Categoria(); 
}